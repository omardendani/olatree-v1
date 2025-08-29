import { useEffect, useState } from "react";
import { usePageData } from "../../../../../../contexts/PageDataContext.jsx";

export default function useLayoutMargins() {
  const { systemDesign } = usePageData();
  const widgetGap = `${systemDesign?.layout?.widgets?.gap || 16}px`;

  // Configuration des marges par breakpoint
  const layoutMarginSystem = {
    mobile: ["3rem", widgetGap],
    smallTablet: ["5vh", "5%"],
    tablet: ["5vh", "5%"],
    smallDesktop: ["10vh", "7%"],
    xSmallDesktop: ["10vh", "7%"],
    desktop: ["10vh", "10%"],
  };

  function getMargins(width) {
    if (width < 480) return layoutMarginSystem.mobile;
    if (width < 768) return layoutMarginSystem.smallTablet;
    if (width < 1024) return layoutMarginSystem.tablet;
    if (width < 1280) return layoutMarginSystem.smallDesktop;
    if (width < 1440) return layoutMarginSystem.xSmallDesktop;
    return layoutMarginSystem.desktop;
  }

  const [margins, setMargins] = useState(
    getMargins(typeof window !== "undefined" ? window.innerWidth : 0)
  );

  useEffect(() => {
    const onResize = () => setMargins(getMargins(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return margins;
}
