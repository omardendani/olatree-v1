// hooks/useCollisionSystem.js
import { useMemo } from 'react';
import { GRID_CONFIG } from '../config/bentoConfig.jsx';

// Devise type:
    import { useDeviceType, normalizeDeviceType } from './useDeviceType.jsx'; // à créer si tu choisis le hook


export const useCollisionSystem = (gridConfig) => {
        
// Configs:
    const deviceType = normalizeDeviceType(useDeviceType()); // 'MOBILE' ou 'DESKTOP'

    function getGridConfigValue(deviceType, key) {
        const config = GRID_CONFIG[deviceType?.toUpperCase()];
        if (!config) {
            console.warn(`Device type "${deviceType}" is not defined in GRID_CONFIG.`);
            return null;
        }

        if (!(key in config)) {
            console.warn(`Key "${key}" is not found in GRID_CONFIG.${deviceType}.`);
            return null;
        }

        return config[key];
    }
    
    return useMemo(() => {
        const doElementsOverlap = (elementA, elementB) => {
            const { x: ax, y: ay, width: aw, height: ah } = elementA;
            const { x: bx, y: by, width: bw, height: bh } = elementB;
            
            return !(ax + aw <= bx || bx + bw <= ax || ay + ah <= by || by + bh <= ay);
        };

        const detectCollision = (movingElement, allElements) => {
            const conflicts = [];
            const { id: movingId } = movingElement;
            
            for (const element of allElements) {
                if (element.id === movingId) continue;
                
                if (doElementsOverlap(movingElement, element)) {
                    conflicts.push(element);
                }
            }
            
            return conflicts;
        };

        const getDirectionPriority = (dragDirection) => {
            const directions = {
                'right': ['right', 'down', 'up', 'left'],
                'left': ['left', 'down', 'up', 'right'],
                'down': ['down', 'right', 'left', 'up'],
                'up': ['up', 'right', 'left', 'down']
            };
            return directions[dragDirection] || ['down', 'right', 'left', 'up'];
        };

        const searchInDirection = (element, direction, occupiedSpaces) => {
            let newX = element.x;
            let newY = element.y;
            
            for (let step = 1; step <= getGridConfigValue(deviceType, 'MAX_SEARCH_STEPS'); step++) {
                switch (direction) {
                    case 'right': newX = element.x + step; break;
                    case 'left': newX = element.x - step; break;
                    case 'down': newY = element.y + step; break;
                    case 'up': newY = element.y - step; break;
                }
                
                if (newX < 0 || newX + element.width > getGridConfigValue(deviceType, 'MAX_COLUMNS') || newY < 0) {
                    break;
                }
                
                const testElement = { ...element, x: newX, y: newY };
                const hasCollision = occupiedSpaces.some(occupied => 
                    occupied.id !== element.id && doElementsOverlap(testElement, occupied)
                );
                
                if (!hasCollision) {
                    return { x: newX, y: newY };
                }
            }
            
            return null;
        };

        const findFirstFreePosition = (element, occupiedSpaces) => {
            for (let y = 0; y < 20; y++) {
                for (let x = 0; x <= getGridConfigValue(deviceType, 'MAX_COLUMNS') - element.width; x++) {
                    const testElement = { ...element, x, y };
                    const hasCollision = occupiedSpaces.some(occupied => 
                        occupied.id !== element.id && doElementsOverlap(testElement, occupied)
                    );
                    
                    if (!hasCollision) {
                        return { x, y };
                    }
                }
            }
            
            return { x: element.x, y: element.y + 1 };
        };

        const findNextFreePosition = (element, dragDirection, occupiedSpaces) => {
            const directions = getDirectionPriority(dragDirection);
            
            for (const direction of directions) {
                const position = searchInDirection(element, direction, occupiedSpaces);
                if (position) return position;
            }
            
            return findFirstFreePosition(element, occupiedSpaces);
        };

        const calculatePreviewPositions = (movingElement, dragDirection, currentElements) => {
            const conflicts = detectCollision(movingElement, currentElements);
            
            if (conflicts.length === 0) return {};
            
            const previewPositions = {};
            const elementsToProcess = [...conflicts];
            const processedElements = new Set();
            
            let updatedElements = currentElements.map(el => 
                el.id === movingElement.id ? movingElement : el
            );
            
            while (elementsToProcess.length > 0) {
                const currentElement = elementsToProcess.shift();
                
                if (processedElements.has(currentElement.id)) continue;
                
                const newPosition = findNextFreePosition(currentElement, dragDirection, updatedElements);
                
                if (newPosition) {
                    const movedElement = { ...currentElement, ...newPosition };
                    
                    const newConflicts = detectCollision(movedElement, updatedElements);
                    newConflicts.forEach(conflict => {
                        if (!processedElements.has(conflict.id) && 
                            !elementsToProcess.some(el => el.id === conflict.id)) {
                            elementsToProcess.push(conflict);
                        }
                    });
                    
                    previewPositions[currentElement.id] = newPosition;
                    updatedElements = updatedElements.map(el => 
                        el.id === currentElement.id ? movedElement : el
                    );
                    processedElements.add(currentElement.id);
                }
            }
            
            return previewPositions;
        };

        return {
            detectCollision,
            findNextFreePosition,
            calculatePreviewPositions
        };
    }, [gridConfig.bento_fr, gridConfig.bento_gap]);
};