// bentoEditingManager.js
import { BENTO_ITEMS } from "../config/bentoConfig.jsx";


/**
 * Gestionnaire centralisé pour l'édition des items Bento
 * Sépare complètement la logique d'édition de la configuration originale
 */
class BentoEditingManager {
    constructor() {
        this.originalItems = BENTO_ITEMS;
        this.workingItems = null;
        this.isEditMode = false;
        this.changeHistory = [];
        this.currentHistoryIndex = -1;
        this.listeners = new Set();
        
        // Initialiser avec les items originaux
        this.reset();
    }

    // ===== GESTION DE L'ÉTAT =====
    
    /**
     * Initialise ou reset vers les items originaux
     */
    reset() {
        this.workingItems = this.deepClone(this.originalItems);
        this.changeHistory = [this.deepClone(this.workingItems)];
        this.currentHistoryIndex = 0;
        this.notifyListeners();
    }

    /**
     * Active/désactive le mode édition
     */
    setEditMode(isActive) {
        this.isEditMode = isActive;
        if (!isActive) {
            // Optionnel : reset automatiquement quand on quitte l'édition
            // this.reset();
        }
        this.notifyListeners();
    }

    /**
     * Retourne les items actuels (working ou original selon le mode)
     */
    getCurrentItems() {
        return this.isEditMode ? this.workingItems : this.originalItems;
    }

    /**
     * Retourne une copie des items de travail
     */
    getWorkingItems() {
        return this.deepClone(this.workingItems);
    }

    // ===== MODIFICATIONS DES ITEMS =====

    /**
     * Met à jour un item spécifique
     */
    updateItem(index, updates) {
        if (!this.isEditMode) {
            console.warn('Cannot update items outside of edit mode');
            return false;
        }

        if (index < 0 || index >= this.workingItems.length) {
            console.error('Invalid item index:', index);
            return false;
        }

        // Créer une nouvelle version avec les updates
        const newItems = [...this.workingItems];
        newItems[index] = this.mergeDeep(newItems[index], updates);
        
        this.workingItems = newItems;
        this.addToHistory();
        this.notifyListeners();
        return true;
    }

    /**
     * Met à jour la position d'un item
     */
    updateItemPosition(index, position) {
        return this.updateItem(index, {
            position: {
                desktop: position
            }
        });
    }

    /**
     * Met à jour le style d'un item
     */
    updateItemStyle(index, style) {
        return this.updateItem(index, {
            style: {
                desktop: style
            }
        });
    }

    /**
     * Échange la position de deux items
     */
    swapItems(index1, index2) {
        if (!this.isEditMode) return false;
        
        const item1 = this.workingItems[index1];
        const item2 = this.workingItems[index2];
        
        if (!item1 || !item2) return false;

        const newItems = [...this.workingItems];
        const pos1 = item1.position.desktop;
        const pos2 = item2.position.desktop;
        
        newItems[index1] = { ...item1, position: { ...item1.position, desktop: pos2 } };
        newItems[index2] = { ...item2, position: { ...item2.position, desktop: pos1 } };
        
        this.workingItems = newItems;
        this.addToHistory();
        this.notifyListeners();
        return true;
    }

    // ===== HISTORIQUE (UNDO/REDO) =====

    /**
     * Ajoute l'état actuel à l'historique
     */
    addToHistory() {
        // Supprimer tout l'historique après l'index actuel
        this.changeHistory = this.changeHistory.slice(0, this.currentHistoryIndex + 1);
        
        // Ajouter le nouvel état
        this.changeHistory.push(this.deepClone(this.workingItems));
        this.currentHistoryIndex++;
        
        // Limiter la taille de l'historique (max 50 états)
        if (this.changeHistory.length > 50) {
            this.changeHistory.shift();
            this.currentHistoryIndex--;
        }
    }

    /**
     * Annule la dernière action (Undo)
     */
    undo() {
        if (!this.canUndo()) return false;
        
        this.currentHistoryIndex--;
        this.workingItems = this.deepClone(this.changeHistory[this.currentHistoryIndex]);
        this.notifyListeners();
        return true;
    }

    /**
     * Refait la dernière action annulée (Redo)
     */
    redo() {
        if (!this.canRedo()) return false;
        
        this.currentHistoryIndex++;
        this.workingItems = this.deepClone(this.changeHistory[this.currentHistoryIndex]);
        this.notifyListeners();
        return true;
    }

    /**
     * Vérifie si on peut annuler
     */
    canUndo() {
        return this.currentHistoryIndex > 0;
    }

    /**
     * Vérifie si on peut refaire
     */
    canRedo() {
        return this.currentHistoryIndex < this.changeHistory.length - 1;
    }

    // ===== PERSISTENCE =====

    /**
     * Sauvegarde les changements (localStorage par défaut)
     */
    save(key = 'bento_working_items') {
        try {
            const dataToSave = {
                items: this.workingItems,
                timestamp: Date.now(),
                version: '1.0'
            };
            localStorage.setItem(key, JSON.stringify(dataToSave));
            return true;
        } catch (error) {
            console.error('Failed to save bento items:', error);
            return false;
        }
    }

    /**
     * Charge les changements sauvegardés
     */
    load(key = 'bento_working_items') {
        try {
            const saved = localStorage.getItem(key);
            if (!saved) return false;
            
            const data = JSON.parse(saved);
            this.workingItems = data.items;
            this.addToHistory();
            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Failed to load bento items:', error);
            return false;
        }
    }

    /**
     * Exporte les items actuels au format JSON
     */
    export() {
        return {
            original: this.originalItems,
            working: this.workingItems,
            timestamp: Date.now()
        };
    }

    /**
     * Importe des items depuis un format JSON
     */
    import(data) {
        if (!data.working) return false;
        
        this.workingItems = this.deepClone(data.working);
        this.addToHistory();
        this.notifyListeners();
        return true;
    }

    // ===== LISTENERS (PATTERN OBSERVER) =====

    /**
     * Ajoute un listener pour les changements
     */
    addListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback); // Retourne une fonction de cleanup
    }

    /**
     * Notifie tous les listeners des changements
     */
    notifyListeners() {
        const eventData = {
            items: this.getCurrentItems(),
            isEditMode: this.isEditMode,
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
            hasChanges: this.hasChanges()
        };
        
        this.listeners.forEach(callback => {
            try {
                callback(eventData);
            } catch (error) {
                console.error('Error in bento listener:', error);
            }
        });
    }

    // ===== UTILITAIRES =====

    /**
     * Vérifie s'il y a des changements non sauvegardés
     */
    hasChanges() {
        return JSON.stringify(this.workingItems) !== JSON.stringify(this.originalItems);
    }

    /**
     * Deep clone d'un objet
     */
    deepClone(obj) {
        return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
    }

    /**
     * Merge profond de deux objets
     */
    mergeDeep(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.mergeDeep(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }

    /**
     * Valide la structure d'un item
     */
    validateItem(item) {
        const requiredStructure = {
            position: { desktop: { x: 'number', y: 'number' } },
            style: { desktop: { w: 'number', h: 'number' } }
        };
        
        // Validation basique (à étendre selon les besoins)
        return item && 
               item.position && 
               item.position.desktop && 
               typeof item.position.desktop.x === 'number' &&
               typeof item.position.desktop.y === 'number';
    }
}

// Singleton instance
const bentoEditingManager = new BentoEditingManager();

// Export du singleton et de la classe pour les tests
export default bentoEditingManager;
export { BentoEditingManager };