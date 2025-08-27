import { useEffect, useState } from "react";

// Configuration des marges
const layoutMarginSystem = {
  mobile: ["3rem", "1.5rem"],
  smallTablet: ["5vh", "5%"],
  tablet: ["5vh", "5%"],
  smallDesktop: ["10vh", "7%"],
  xSmallDesktop: ["10vh", "7%"],
  desktop: ["10vh", "10%"],
};

// Breakpoints (tu peux ajuster)
const breakpoints = {
  mobile: 768,    // < 768px = mobile
  smallTablet: 900, // <= 900px = small tablet
  tablet: 1024,   // < 1024px = tablet
  smallDesktop: 1570,  // <= 1570 = small desktop
  xSmallDesktop: 1440,  // <= 1440 = small desktop
  desktop: 9999,  // reste = desktop
};

// Hook qui retourne les marges en fonction de la largeur
export function useLayoutMargins() {
  const getMargins = (width) => {
    if (width < breakpoints.mobile) {   // MOBILE
      return {
        varLayoutTopMargin: layoutMarginSystem.mobile[0],
        varLayoutBordMargin: layoutMarginSystem.mobile[1],
      };
    } else if (width < breakpoints.smallTablet) {   // SMALL TABLET
      return {
        varLayoutTopMargin: layoutMarginSystem.smallTablet[0],
        varLayoutBordMargin: layoutMarginSystem.smallTablet[1],
      };
    } else if (width < breakpoints.tablet) {    // TABLET
      return {
        varLayoutTopMargin: layoutMarginSystem.tablet[0],
        varLayoutBordMargin: layoutMarginSystem.tablet[1],
      };
    } else if (width < breakpoints.smallDesktop) {    // SMALL DESKTOP
      return {
        varLayoutTopMargin: layoutMarginSystem.smallDesktop[0],
        varLayoutBordMargin: layoutMarginSystem.smallDesktop[1],
      };
    }  else if (width < breakpoints.xSmallDesktop) {    // X-SMALL DESKTOP
      return {
        varLayoutTopMargin: layoutMarginSystem.xSmallDesktop[0],
        varLayoutBordMargin: layoutMarginSystem.xSmallDesktop[1],
      };
    } else {    // DESKTOP
      return {
        varLayoutTopMargin: layoutMarginSystem.desktop[0],
        varLayoutBordMargin: layoutMarginSystem.desktop[1],
      };
    }
  };

  const [margins, setMargins] = useState(
    getMargins(typeof window !== "undefined" ? window.innerWidth : 0)
  );

  useEffect(() => {
    const onResize = () => {
      setMargins(getMargins(window.innerWidth));
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return margins;
}
