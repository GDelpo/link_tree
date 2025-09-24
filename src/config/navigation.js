import { routeConfig } from './routes';
import MainLayout from '@/layouts/MainLayout';

/**
 * Genera los elementos para el menú de navegación principal (Sidebar).
 * Se filtra para incluir solo las rutas que usan MainLayout y tienen configuración de nav.
 */
export const mainNavItems = routeConfig
  .filter(route => route.layout === MainLayout && route.nav)
  .map(route => ({
    to: route.path,
    ...route.nav,
  }));
