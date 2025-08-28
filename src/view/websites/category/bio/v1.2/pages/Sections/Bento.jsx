import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from "gsap/Draggable";

// Devise type:
import { useDeviceType, normalizeDeviceType } from './hooks/useDeviceType.jsx'; // à créer si tu choisis le hook


// Config :
import { GENERAL_CONFIG, GRID_CONFIG, widgetItems } from './config/bentoConfig.jsx';

// Hooks :
import { useDivWidth } from './hooks/useDivWidth.jsx';
import { useCollisionSystem } from './hooks/useCollisionSystem.jsx';
import { useGridCalculations } from './hooks/useGridCalculations.jsx';
import { useDragLogic } from './hooks/useDragLogic.jsx';

// Components :
import DraggableItem from './components/DraggableItem.jsx';

// Registrer le plugin Draggable
gsap.registerPlugin(Draggable);

export function Edit_Mode_Bento() {
    const sourceWidgets = widgetItems();

    // Configs:
    const deviceType = normalizeDeviceType(useDeviceType()); // 'MOBILE' ou 'DESKTOP'
    const device = normalizeDeviceType(deviceType);

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

    const { divRef, width } = useDivWidth();
    const [containerHeight, setContainerHeight] = useState(0);
    const prevWidthRef = useRef(width);

    const bento_gap = GENERAL_CONFIG.BENTO_GRID_GAP;
    const bento_columns = getGridConfigValue(deviceType, "MAX_COLUMNS");
    const gridCalc = useGridCalculations(width, bento_gap, bento_columns);
    const collisionSystem = useCollisionSystem(gridCalc);

    // 🔹 dragState sécurisé
    const dragState = useRef({
        isDragging: false,
        draggedItemId: null,
        previewElements: new Set(),
        previewPositions: {},
        currentPositions: sourceWidgets
            ? sourceWidgets.map((item, index) => ({
                id: index,
                x: item?.position?.[device]?.x ?? 0,
                y: item?.position?.[device]?.y ?? 0,
                width: item?.style?.[device]?.w ?? 1,
                height: item?.style?.[device]?.h ?? 1,
            }))
            : [],
    });

    // 🔹 Fonction optimisée pour calculer la hauteur
    const calculateContainerHeight = useCallback(
        (positions) => {
            let maxBottomPosition = 0;

            positions.forEach((pos) => {
                const bottomPosition = pos.y + pos.height;
                if (bottomPosition > maxBottomPosition) {
                    maxBottomPosition = bottomPosition;
                }
            });

            const { bento_fr, bento_gap, btm_margin } = gridCalc;
            let height = bento_fr * maxBottomPosition;
            if (maxBottomPosition > 1) {
                height += bento_gap * (maxBottomPosition - 1);
            }

            return height + btm_margin;
        },
        [gridCalc]
    );

    const updateContainerHeight = useCallback(() => {
        if (dragLogic.getCurrentPositions) {
            const currentPositions = dragLogic.getCurrentPositions();
            const newHeight = calculateContainerHeight(currentPositions);
            setContainerHeight(newHeight);
        }
    }, [calculateContainerHeight]);

    const dragLogic = useDragLogic(width, gridCalc, collisionSystem, updateContainerHeight);

    // 🔹 Items sécurisés
    const items = useMemo(() => {
        if (!sourceWidgets || width === 0) return [];

        return sourceWidgets.map((item, index) => {
            const h = item?.style?.[device]?.h ?? 1;
            const w = item?.style?.[device]?.w ?? 1;
            const x = item?.position?.[device]?.x ?? 0;
            const y = item?.position?.[device]?.y ?? 0;

            const { height, width: itemWidth } = gridCalc.calculateItemDimensions(h, w);
            const { x: x_position, y: y_position } = gridCalc.calculateItemPosition(x, y);
            const transform = `translate(${x_position}px, ${y_position}px)`;

            return (
                <DraggableItem
                    key={index}
                    item={item}
                    index={index}
                    transform={transform}
                    height={height}
                    width={itemWidth}
                    isDragging={dragLogic.isDragging ? dragLogic.isDragging() : false}
                    data-draggable-id={index}
                />
            );
        });
    }, [width, gridCalc, device, sourceWidgets, dragLogic]);

    // 🔹 Mettre à jour la hauteur du conteneur quand width change
    useEffect(() => {
        if (width > 0) {
            updateContainerHeight();
        }
    }, [width, updateContainerHeight]);

    // 🔹 Mettre à jour quand width change (après resize)
    useEffect(() => {
        if (width > 0 && prevWidthRef.current !== width && prevWidthRef.current > 0) {
            const currentPositions = dragLogic.getCurrentPositions
                ? dragLogic.getCurrentPositions()
                : [];

            // Réappliquer les transformations
            currentPositions.forEach((pos, index) => {
                const element = document.querySelector(`#item_${index}`);
                if (element) {
                    const { x: x_position, y: y_position } = gridCalc.calculateItemPosition(pos.x, pos.y);
                    const { height, width: itemWidth } = gridCalc.calculateItemDimensions(
                        pos.height,
                        pos.width
                    );

                    gsap.set(element, {
                        x: x_position,
                        y: y_position,
                        width: itemWidth,
                        height: height,
                    });
                }
            });

            updateContainerHeight();
        }

        prevWidthRef.current = width;
    }, [width, gridCalc, updateContainerHeight, dragLogic]);

    return (
        <main
            ref={divRef}
            className="bento-body"
            id="bento_container"
            style={{
                height: containerHeight > 0 ? `${containerHeight}px` : undefined,
                position: "relative",
                transition: "height 0.3s ease-out",
            }}
        >
            {items.length > 0 && items}
        </main>
    );
}

export function Viewer_Mode_Bento() {

    const sourceWidgets = widgetItems();

    const deviceType = normalizeDeviceType(useDeviceType()); // 'MOBILE' ou 'DESKTOP'
    const { divRef, width } = useDivWidth();
    const [containerHeight, setContainerHeight] = useState(0);

    const getGridConfigValue = (deviceType, key) => {
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
    };

    const bento_gap = GENERAL_CONFIG.BENTO_GRID_GAP;
    const bento_columns = getGridConfigValue(deviceType, "MAX_COLUMNS");
    const gridCalc = useGridCalculations(width, bento_gap, bento_columns);

    // 🔹 Calcule la hauteur du conteneur
    useEffect(() => {
        if (!sourceWidgets || width === 0) return;

        const positions = sourceWidgets.map((item, index) => ({
            id: index,
            x: item?.position?.[deviceType.toLowerCase()]?.x ?? 0,
            y: item?.position?.[deviceType.toLowerCase()]?.y ?? 0,
            width: item?.style?.[deviceType.toLowerCase()]?.w ?? 1,
            height: item?.style?.[deviceType.toLowerCase()]?.h ?? 1,
        }));

        let maxBottom = 0;
        positions.forEach((pos) => {
            const bottom = pos.y + pos.height;
            if (bottom > maxBottom) maxBottom = bottom;
        });

        const { bento_fr, bento_gap, btm_margin } = gridCalc;
        let height = bento_fr * maxBottom;
        if (maxBottom > 1) {
            height += bento_gap * (maxBottom - 1);
        }

        setContainerHeight(height + btm_margin);
    }, [width, deviceType, gridCalc, sourceWidgets]);

    // 🔹 Items
    const items = useMemo(() => {
        if (!sourceWidgets || width === 0) return [];

        return sourceWidgets.map((item, index) => {
            const h = item?.style?.[deviceType.toLowerCase()]?.h ?? 1;
            const w = item?.style?.[deviceType.toLowerCase()]?.w ?? 1;
            const x = item?.position?.[deviceType.toLowerCase()]?.x ?? 0;
            const y = item?.position?.[deviceType.toLowerCase()]?.y ?? 0;

            const { height, width: itemWidth } = gridCalc.calculateItemDimensions(h, w);
            const { x: xPos, y: yPos } = gridCalc.calculateItemPosition(x, y);
            const transform = `translate(${xPos}px, ${yPos}px)`;

            return (
                <DraggableItem
                    key={index}
                    item={item}
                    index={index}
                    transform={transform}
                    height={height}
                    width={itemWidth}
                    isDragging={false}
                    data-draggable-id={index}
                />
            );
        });
    }, [width, gridCalc, deviceType, sourceWidgets]);

    return (
        <main
            ref={divRef}
            className="bento-body"
            id="bento_container"
            style={{
                height: containerHeight > 0 ? `${containerHeight}px` : undefined,
                position: "relative",
                transition: "height 0.3s ease-out",
            }}
        >
            {items.length > 0 && items}
        </main>
    );
}
