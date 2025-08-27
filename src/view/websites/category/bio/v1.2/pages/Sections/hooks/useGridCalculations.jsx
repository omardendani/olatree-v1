// hooks/useGridCalculations.js
import { useMemo } from 'react';

export const useGridCalculations = (width, bento_gap, bento_columns) => {
    return useMemo(() => {
        const bento_fr = width / bento_columns - bento_gap + bento_gap / bento_columns;
        
        return {
            bento_fr,
            bento_gap,
            btm_margin: bento_fr * 2,
            
            pixelToGrid: (pixelX, pixelY) => {
                const gridX = Math.round(pixelX / (bento_fr + bento_gap));
                const gridY = Math.round(pixelY / (bento_fr + bento_gap));
                return { x: Math.max(0, gridX), y: Math.max(0, gridY) };
            },
            
            gridToPixel: (gridX, gridY) => {
                const pixelX = gridX > 0 ? (bento_fr * gridX) + (bento_gap * gridX) : bento_fr * gridX;
                const pixelY = gridY > 0 ? (bento_fr * gridY) + (bento_gap * gridY) : bento_fr * gridY;
                return { x: pixelX, y: pixelY };
            },

            calculateItemDimensions: (h, w) => {
                let height = bento_fr * h;
                let width = bento_fr * w;
                if (h > 1) height = bento_fr * h + (bento_gap * (h - 1));
                if (w > 1) width = bento_fr * w + (bento_gap * (w - 1));
                return { height, width };
            },

            calculateItemPosition: (x, y) => {
                let x_position = bento_fr * x;
                let y_position = bento_fr * y;
                if (x > 0) x_position = (bento_fr * x) + (bento_gap * x);
                if (y > 0) y_position = (bento_fr * y) + (bento_gap * y);
                return { x: x_position, y: y_position };
            }
        };
    }, [width, bento_gap]);
};