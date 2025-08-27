// 2. HOOKS UTILITAIRES
// hooks/useDivWidth.js
import { useRef, useState, useEffect, useMemo } from 'react';
import { debounce } from '../utils/helpers';
import { GRID_CONFIG } from '../config/bentoConfig.jsx';

// Devise type:
    import { useDeviceType, normalizeDeviceType } from './useDeviceType.jsx'; // à créer si tu choisis le hook


export function useDivWidth() {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);

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
    
    const updateWidth = useMemo(
        () => debounce(() => {
            if (divRef.current) {
                const newWidth = divRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
            }
        }, getGridConfigValue(deviceType, 'DEBOUNCE_DELAY')),
        []
    );

    useEffect(() => {
        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [updateWidth]);

    return { divRef, width };
}