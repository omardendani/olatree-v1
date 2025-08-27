// src/utils/device.js
/**
 * Tabet <= 1285px 
 * Small Tabet <= 1150px 
 * Mobile <= 900px
 * 
 */

const breakpoints = {
  mobile: 768,    // <= 768px = MOBILE
  smallTablet: 900, // <= 900px = SMALL_TABLET
  tablet: 1150,   // <= 1150px = TABLET
  xSmallDesktop: 1400,  // <= 1440 = X_SMALL_DESKTOP
  smallDesktop: 1570,  // <= 1570 = SMALL_DESKTOP
  desktop: 9999,  // au-delà = DESKTOP
};

export function detectDeviceType() {
  if (typeof window === 'undefined') return 'DESKTOP'; // sécurité SSR

  const width = window.innerWidth;

  if (width <= breakpoints.mobile) return 'MOBILE';
  if (width <= breakpoints.smallTablet) return 'SMALL_TABLET';
  if (width <= breakpoints.tablet) return 'TABLET';
  if (width <= breakpoints.xSmallDesktop) return 'X_SMALL_DESKTOP';
  if (width <= breakpoints.smallDesktop) return 'SMALL_DESKTOP';

  return 'DESKTOP';
}
