// hooks/useDragLogic.js
import { useRef, useCallback, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { Draggable } from "gsap/Draggable";
import { GRID_CONFIG, BENTO_ITEMS } from '../config/bentoConfig.jsx';

// Devise type:
    import { useDeviceType, normalizeDeviceType } from './useDeviceType.jsx'; // à créer si tu choisis le hook

// Register plugin Draggable
    gsap.registerPlugin(Draggable);

export const useDragLogic = (width, gridCalc, collisionSystem, updateContainerHeight) => {

    // Configs:
    const deviceType = normalizeDeviceType(useDeviceType()); // 'MOBILE' ou 'DESKTOP'
    

    // Memoize la config spécifique au device pour éviter recalculs inutiles
    const gridConfig = useMemo(() => {
        const config = GRID_CONFIG[deviceType?.toUpperCase()];
        if (!config) {
            console.warn(`Device type "${deviceType}" is not defined in GRID_CONFIG.`);
            return {};
        }
        return config;
    }, [deviceType]);

    // Helper pour récupérer la valeur de config
    function getGridConfigValue(key) {
        if (!(key in gridConfig)) {
            console.warn(`Key "${key}" is not found in GRID_CONFIG.${deviceType}.`);
            return null;
        }
        return gridConfig[key];
    }

    // Device key en lowercase pour accéder aux bons champs dans BENTO_ITEMS
    const deviceKey = normalizeDeviceType(deviceType); // fallback desktop si undefined

    // Consolidated drag state in a ref
    const dragState = useRef({
        isDragging: false,
        draggedItemId: null,
        previewElements: new Set(),
        previewPositions: {},
        currentPositions: BENTO_ITEMS.map((item, index) => ({
            id: index,
            x: item.position[deviceKey].x,
            y: item.position[deviceKey].y,
            width: item.style[deviceKey].w,
            height: item.style[deviceKey].h
        }))
    });

    // Batch animation helper
    const animateElements = useCallback((updates) => {
        const timeline = gsap.timeline();
        updates.forEach(({ element, props }) => {
            timeline.to(element, {
                duration: getGridConfigValue('ANIMATION_DURATION'),
                ease: "power2.out",
                ...props
            }, 0);
        });
        return timeline;
    }, [getGridConfigValue]);

    // Apply preview positions with animation
    const applyPreviewPositions = useCallback((previewPositions) => {
        const animations = [];

        dragState.current.previewElements.forEach(elementId => {
            const targetElement = document.querySelector(`#item_${elementId}`);
            if (targetElement) {
                const originalPos = dragState.current.currentPositions[elementId];
                const pixelPos = gridCalc.gridToPixel(originalPos.x, originalPos.y);
                animations.push({
                    element: targetElement,
                    props: { x: pixelPos.x, y: pixelPos.y, opacity: 1, scale: 1 }
                });
            }
        });

        dragState.current.previewElements.clear();

        Object.keys(previewPositions).forEach(elementId => {
            const targetElement = document.querySelector(`#item_${elementId}`);
            if (targetElement) {
                const pixelPos = gridCalc.gridToPixel(previewPositions[elementId].x, previewPositions[elementId].y);
                animations.push({
                    element: targetElement,
                    props: {
                        x: pixelPos.x,
                        y: pixelPos.y,
                        opacity: getGridConfigValue('PREVIEW_OPACITY'),
                        scale: getGridConfigValue('PREVIEW_SCALE')
                    }
                });
                dragState.current.previewElements.add(parseInt(elementId));
            }
        });

        if (animations.length > 0) {
            animateElements(animations);
        }

        dragState.current.previewPositions = previewPositions;
    }, [gridCalc, animateElements, getGridConfigValue]);

    // Clear preview with animation
    const clearPreviewPositions = useCallback(() => {
        const animations = [];

        dragState.current.previewElements.forEach(elementId => {
            const targetElement = document.querySelector(`#item_${elementId}`);
            if (targetElement) {
                const originalPos = dragState.current.currentPositions[elementId];
                const pixelPos = gridCalc.gridToPixel(originalPos.x, originalPos.y);
                animations.push({
                    element: targetElement,
                    props: { x: pixelPos.x, y: pixelPos.y, opacity: 1, scale: 1 }
                });
            }
        });

        if (animations.length > 0) {
            animateElements(animations);
        }

        dragState.current.previewElements.clear();
        dragState.current.previewPositions = {};
    }, [gridCalc, animateElements]);

    // Calculate drag direction helper
    const calculateDragDirection = useCallback((originalPos, newPos) => {
        const deltaX = newPos.x - originalPos.x;
        const deltaY = newPos.y - originalPos.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return deltaX > 0 ? 'right' : 'left';
        } else {
            return deltaY > 0 ? 'down' : 'up';
        }
    }, []);

    // Finalize positions after drag end
    const finalizePositions = useCallback((draggedIndex, finalGridPos) => {
        const movingElement = {
            id: draggedIndex,
            x: finalGridPos.x,
            y: finalGridPos.y,
            width: BENTO_ITEMS[draggedIndex].style[deviceKey].w,
            height: BENTO_ITEMS[draggedIndex].style[deviceKey].h
        };

        const dragDirection = calculateDragDirection(
            dragState.current.currentPositions[draggedIndex],
            finalGridPos
        );

        const previewPositions = collisionSystem.calculatePreviewPositions(
            movingElement,
            dragDirection,
            dragState.current.currentPositions
        );

        const animations = [];

        Object.keys(previewPositions).forEach(elementId => {
            const id = parseInt(elementId);
            dragState.current.currentPositions[id] = {
                ...dragState.current.currentPositions[id],
                ...previewPositions[elementId]
            };

            const targetElement = document.querySelector(`#item_${elementId}`);
            if (targetElement) {
                const pixelPos = gridCalc.gridToPixel(previewPositions[elementId].x, previewPositions[elementId].y);
                animations.push({
                    element: targetElement,
                    props: { x: pixelPos.x, y: pixelPos.y, opacity: 1, scale: 1 }
                });
            }
        });

        // Update dragged item final position
        dragState.current.currentPositions[draggedIndex] = {
            ...dragState.current.currentPositions[draggedIndex],
            ...finalGridPos
        };

        if (animations.length > 0) {
            animateElements(animations);
        }
    }, [gridCalc, collisionSystem, calculateDragDirection, animateElements, deviceKey]);

    // GSAP Draggable initialization and cleanup
    useEffect(() => {
        if (width === 0) return;

        const timeoutId = setTimeout(() => {
            const draggableInstances = [];

            for (let i = 0; i < BENTO_ITEMS.length; i++) {
                const id = '#item_' + i;
                const element = document.querySelector(id);

                if (element) {
                    try {
                        const draggableInstance = Draggable.create(element, {
                            bounds: "#bento_container",
                            inertia: false,
                            type: "x,y",
                            edgeResistance: 0.65,
                            onDragStart: function () {
                                dragState.current.isDragging = true;
                                dragState.current.draggedItemId = i;
                                gsap.set(this.target, { zIndex: 1000 });
                            },
                            onClick: function () {
                                console.log("clicked item", i);
                            },
                            onDrag: function () {
                                const gridPos = gridCalc.pixelToGrid(this.x, this.y);
                                const originalPos = dragState.current.currentPositions[i];

                                const boundedGridPos = {
                                    x: Math.min(gridPos.x, getGridConfigValue('MAX_COLUMNS') - BENTO_ITEMS[i].style[deviceKey].w),
                                    y: Math.max(0, gridPos.y)
                                };

                                const movingElement = {
                                    id: i,
                                    x: boundedGridPos.x,
                                    y: boundedGridPos.y,
                                    width: BENTO_ITEMS[i].style[deviceKey].w,
                                    height: BENTO_ITEMS[i].style[deviceKey].h
                                };

                                const dragDirection = calculateDragDirection(originalPos, boundedGridPos);
                                const previewPositions = collisionSystem.calculatePreviewPositions(
                                    movingElement,
                                    dragDirection,
                                    dragState.current.currentPositions
                                );

                                applyPreviewPositions(previewPositions);
                            },
                            onDragEnd: function () {
                                dragState.current.isDragging = false;
                                dragState.current.draggedItemId = null;
                                gsap.set(this.target, { zIndex: 'auto' });

                                const gridPos = gridCalc.pixelToGrid(this.x, this.y);
                                const finalGridX = Math.min(gridPos.x, getGridConfigValue('MAX_COLUMNS') - BENTO_ITEMS[i].style[deviceKey].w);
                                const finalGridY = Math.max(0, gridPos.y);
                                const finalGridPos = { x: finalGridX, y: finalGridY };

                                finalizePositions(i, finalGridPos);

                                const snapPos = gridCalc.gridToPixel(finalGridX, finalGridY);
                                gsap.to(this.target, {
                                    duration: getGridConfigValue('ANIMATION_DURATION'),
                                    x: snapPos.x,
                                    y: snapPos.y,
                                    ease: "power2.out"
                                });

                                this.x = snapPos.x;
                                this.y = snapPos.y;

                                clearPreviewPositions();

                                setTimeout(() => {
                                    updateContainerHeight();
                                }, 350);
                            }
                        });

                        if (draggableInstance && draggableInstance.length > 0) {
                            draggableInstances.push(draggableInstance[0]);
                        }
                    } catch (error) {
                        console.error('Erreur lors de la création du Draggable:', error);
                    }
                }
            }

            return () => {
                draggableInstances.forEach(instance => {
                    instance?.kill?.();
                });
                dragState.current.previewElements.clear();
                gsap.killTweensOf("*");
            };
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [width, gridCalc, collisionSystem, applyPreviewPositions, clearPreviewPositions, finalizePositions, calculateDragDirection, updateContainerHeight, getGridConfigValue, deviceKey]);

    // Public API
    const getDragState = useCallback(() => dragState.current, []);
    const getCurrentPositions = useCallback(() => dragState.current.currentPositions, []);
    const isDragging = useCallback(() => dragState.current.isDragging, []);
    const getDraggedItemId = useCallback(() => dragState.current.draggedItemId, []);
    const updateItemPosition = useCallback((itemIndex, newPosition) => {
        if (itemIndex >= 0 && itemIndex < dragState.current.currentPositions.length) {
            dragState.current.currentPositions[itemIndex] = {
                ...dragState.current.currentPositions[itemIndex],
                ...newPosition
            };
        }
    }, []);
    const resetPositions = useCallback(() => {
        dragState.current.currentPositions = BENTO_ITEMS.map((item, index) => ({
            id: index,
            x: item.position[deviceKey].x,
            y: item.position[deviceKey].y,
            width: item.style[deviceKey].w,
            height: item.style[deviceKey].h
        }));

        const animations = [];

        BENTO_ITEMS.forEach((item, index) => {
            const element = document.querySelector(`#item_${index}`);
            if (element) {
                const { x, y } = item.position[deviceKey];
                const pixelPos = gridCalc.gridToPixel(x, y);
                animations.push({
                    element: element,
                    props: {
                        x: pixelPos.x,
                        y: pixelPos.y,
                        opacity: 1,
                        scale: 1
                    }
                });
            }
        });

        if (animations.length > 0) {
            animateElements(animations);
        }

        setTimeout(() => {
            updateContainerHeight();
        }, getGridConfigValue('ANIMATION_DURATION') * 1000 + 50);
    }, [gridCalc, animateElements, updateContainerHeight, getGridConfigValue, deviceKey]);

    return {
        getDragState,
        getCurrentPositions,
        isDragging,
        getDraggedItemId,
        updateItemPosition,
        resetPositions,
        applyPreviewPositions,
        clearPreviewPositions,
        finalizePositions,
        calculateDragDirection
    };
};
