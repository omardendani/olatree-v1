// utils/dynamicImports.js
import { lazy } from 'react';

// Vite analyse ceci statiquement et inclut tous les fichiers matchants au build
const modules = import.meta.glob('../view/Baserage/**/*.jsx');

// Cache pour éviter de recréer les composants lazy
const componentCache = new Map();

export const loadComponent = (templateName, pageName) => {
  const path = `../view/Baserage/${templateName}/${pageName}.jsx`;
  
  // Vérifier si le module existe
  if (!modules[path]) {
    console.error(`Component not found: ${path}`);
    console.log('Available modules:', Object.keys(modules));
    return null;
  }

  // Utiliser le cache si le composant existe déjà
  if (componentCache.has(path)) {
    return componentCache.get(path);
  }

  // Créer le composant lazy
  const LazyComponent = lazy(() => modules[path]());
  
  // Mettre en cache
  componentCache.set(path, LazyComponent);
  
  return LazyComponent;
};

// Version alternative avec import.meta.glob eager (charge tout de suite)
const eagerModules = import.meta.glob('../view/Baserage/**/*.jsx', { eager: true });

export const loadComponentSync = (templateName, pageName) => {
  const path = `../view/Baserage/${templateName}/${pageName}.jsx`;
  const module = eagerModules[path];
  
  if (!module) {
    console.error(`Component not found: ${path}`);
    return null;
  }
  
  return module.default;
};