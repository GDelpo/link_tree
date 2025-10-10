import { useCallback } from 'react';

/**
 * Hook para precargar rutas lazy de forma inteligente
 * Precarga las rutas cuando el usuario hace hover sobre los links
 */
export const useRoutePreloader = () => {
  const preloadRoute = useCallback((routePath) => {
    // Mapeo de rutas a sus funciones de import lazy
    const routeImports = {
      '/about': () => import('@pages/About'),
      '/faqs': () => import('@pages/Faqs'),
      '/links': () => import('@pages/Links'),
      '/redes': () => import('@pages/Redes'),
    };

    const importFunction = routeImports[routePath];
    if (importFunction) {
      // Precarga silenciosamente el componente
      importFunction().catch(() => {
        // Manejo silencioso de errores de precarga
        console.warn(`Failed to preload route: ${routePath}`);
      });
    }
  }, []);

  return { preloadRoute };
};