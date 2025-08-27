import { useEffect, useState } from 'react';
import { detectDeviceType } from '../../../utils/device.js';

// ✅ Ton hook
export function useDeviceType() {
    const [deviceType, setDeviceType] = useState(detectDeviceType());

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(detectDeviceType());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return deviceType;
}

export function normalizeDeviceType(deviceType) {
    if( deviceType === 'MOBILE' ) {return 'mobile'}
    if( deviceType === 'SMALL_TABLET' ) {return 'mobile'}
    if( deviceType === 'TABLET' ) {return 'mobile'}
    if( deviceType === 'X_SMALL_DESKTOP' ) {return 'mobile'}
    if( deviceType === 'SMALL_DESKTOP' ) {return 'desktop'}
    if( deviceType === 'DESKTOP' ) {return 'desktop'}
}