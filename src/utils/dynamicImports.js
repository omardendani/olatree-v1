// src/utils/dynamicImports.js
import { lazy } from "react";

// --- Glob dynamique pour tous les fichiers .jsx sous view/Baserage ---
const modules = import.meta.glob("../view/Baserage/**/*.jsx");

// --- Cache pour éviter de recréer les composants lazy ---
const componentCache = new Map();

/**
 * Charge dynamiquement un composant par templateName et pageName
 * @param {string} templateName - Nom du template (dossier)
 * @param {string} pageName - Nom du composant/page (fichier sans extension)
 * @returns {React.LazyExoticComponent} - Composant React lazy
 */
export const loadComponent = (templateName, pageName) => {
  // Cherche le chemin exact correspondant dans le glob
  const normalizedPath = Object.keys(modules).find((key) =>
    key.endsWith(`${templateName}/${pageName}.jsx`)
  );

  if (!normalizedPath) {
    console.error(`Component not found: ${templateName}/${pageName}`);
    console.log("Available modules:", Object.keys(modules));
    return null;
  }

  // Vérifie le cache
  if (componentCache.has(normalizedPath)) {
    return componentCache.get(normalizedPath);
  }

  // Crée le composant lazy
  const LazyComponent = lazy(() => modules[normalizedPath]());

  // Met en cache
  componentCache.set(normalizedPath, LazyComponent);

  return LazyComponent;
};

/**
 * Version synchrone qui charge tout de suite (eager) pour certains cas
 */
const eagerModules = import.meta.glob("../view/Baserage/**/*.jsx", { eager: true });

export const loadComponentSync = (templateName, pageName) => {
  const normalizedPath = Object.keys(eagerModules).find((key) =>
    key.endsWith(`${templateName}/${pageName}.jsx`)
  );

  if (!normalizedPath) {
    console.error(`Component not found (sync): ${templateName}/${pageName}`);
    return null;
  }

  return eagerModules[normalizedPath].default;
};
