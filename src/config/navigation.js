/**
 * Genera los elementos para el menú de navegación principal (Sidebar).
 * Recibe el routeConfig y construye un array de items de nav.
 */
export function buildMainNavItems(routeConfig) {
  return routeConfig.main
    .filter((route) => route.nav)
    .map((route) => ({
      to: route.path,
      ...route.nav,
    }));
}
