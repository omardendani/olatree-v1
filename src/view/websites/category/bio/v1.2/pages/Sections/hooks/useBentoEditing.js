// hooks/useBentoEditing.js
import { useState, useEffect, useCallback, useRef } from 'react';
import bentoEditingManager from '../utils/bentoEditingManager.js';

/**
 * Hook React pour interfacer avec le BentoEditingManager
 * Fournit une API React-friendly pour l'édition des items Bento
 */
export function useBentoEditing(editMode = false) {
    // État local synchronisé avec le manager
    const [items, setItems] = useState(() => bentoEditingManager.getCurrentItems());
    const [isEditMode, setIsEditMode] = useState(editMode);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    
    // Ref pour éviter les re-renders inutiles
    const listenerRef = useRef(null);

    // Synchroniser le mode édition avec le manager
    useEffect(() => {
        bentoEditingManager.setEditMode(editMode);
        setIsEditMode(editMode);
    }, [editMode]);

    // S'abonner aux changements du manager
    useEffect(() => {
        const handleManagerUpdate = (eventData) => {
            setItems([...eventData.items]); // Force re-render avec nouvelle référence
            setIsEditMode(eventData.isEditMode);
            setCanUndo(eventData.canUndo);
            setCanRedo(eventData.canRedo);
            setHasChanges(eventData.hasChanges);
        };

        // Supprimer l'ancien listener s'il existe
        if (listenerRef.current) {
            listenerRef.current();
        }

        // Ajouter le nouveau listener
        listenerRef.current = bentoEditingManager.addListener(handleManagerUpdate);

        // Synchronisation initiale
        handleManagerUpdate({
            items: bentoEditingManager.getCurrentItems(),
            isEditMode: bentoEditingManager.isEditMode,
            canUndo: bentoEditingManager.canUndo(),
            canRedo: bentoEditingManager.canRedo(),
            hasChanges: bentoEditingManager.hasChanges()
        });

        // Cleanup
        return () => {
            if (listenerRef.current) {
                listenerRef.current();
            }
        };
    }, []);

    // ===== ACTIONS D'ÉDITION =====

    const updateItemPosition = useCallback((index, position) => {
        return bentoEditingManager.updateItemPosition(index, position);
    }, []);

    const updateItemStyle = useCallback((index, style) => {
        return bentoEditingManager.updateItemStyle(index, style);
    }, []);

    const updateItem = useCallback((index, updates) => {
        return bentoEditingManager.updateItem(index, updates);
    }, []);

    const swapItems = useCallback((index1, index2) => {
        return bentoEditingManager.swapItems(index1, index2);
    }, []);

    // ===== ACTIONS D'HISTORIQUE =====

    const undo = useCallback(() => {
        return bentoEditingManager.undo();
    }, []);

    const redo = useCallback(() => {
        return bentoEditingManager.redo();
    }, []);

    // ===== ACTIONS DE PERSISTENCE =====

    const save = useCallback((key) => {
        return bentoEditingManager.save(key);
    }, []);

    const load = useCallback((key) => {
        return bentoEditingManager.load(key);
    }, []);

    const reset = useCallback(() => {
        bentoEditingManager.reset();
    }, []);

    const exportItems = useCallback(() => {
        return bentoEditingManager.export();
    }, []);

    const importItems = useCallback((data) => {
        return bentoEditingManager.import(data);
    }, []);

    // ===== ACTIONS DE BATCH =====

    const batchUpdate = useCallback((updates) => {
        // Désactiver temporairement les notifications pour éviter les re-renders multiples
        const originalNotify = bentoEditingManager.notifyListeners;
        bentoEditingManager.notifyListeners = () => {};

        let success = true;
        updates.forEach(({ index, data }) => {
            if (!bentoEditingManager.updateItem(index, data)) {
                success = false;
            }
        });

        // Réactiver les notifications et notifier une seule fois
        bentoEditingManager.notifyListeners = originalNotify;
        bentoEditingManager.notifyListeners();

        return success;
    }, []);

    // ===== HELPERS =====

    const getItemById = useCallback((id) => {
        return items.find((item, index) => index === id);
    }, [items]);

    const getItemPosition = useCallback((index) => {
        const item = items[index];
        return item ? item.position.desktop : null;
    }, [items]);

    const getItemStyle = useCallback((index) => {
        const item = items[index];
        return item ? item.style.desktop : null;
    }, [items]);

    // ===== VALIDATION =====

    const validateLayout = useCallback(() => {
        // Vérifier les collisions, positions valides, etc.
        const positions = new Set();
        const errors = [];

        items.forEach((item, index) => {
            const pos = item.position.desktop;
            const style = item.style.desktop;
            
            // Vérifier positions négatives
            if (pos.x < 0 || pos.y < 0) {
                errors.push(`Item ${index}: Position négative`);
            }
            
            // Vérifier tailles invalides
            if (style.w <= 0 || style.h <= 0) {
                errors.push(`Item ${index}: Taille invalide`);
            }
            
            // Vérifier superpositions (basique)
            const posKey = `${pos.x},${pos.y}`;
            if (positions.has(posKey)) {
                errors.push(`Item ${index}: Superposition détectée`);
            }
            positions.add(posKey);
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    }, [items]);

    return {
        // État
        items,
        isEditMode,
        canUndo,
        canRedo,
        hasChanges,
        
        // Édition
        updateItemPosition,
        updateItemStyle,
        updateItem,
        swapItems,
        batchUpdate,
        
        // Historique
        undo,
        redo,
        
        // Persistence
        save,
        load,
        reset,
        exportItems,
        importItems,
        
        // Helpers
        getItemById,
        getItemPosition,
        getItemStyle,
        validateLayout,
        
        // Manager direct (pour cas avancés)
        manager: bentoEditingManager
    };
}