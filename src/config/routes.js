import { Home, User, Share2, HelpCircle, Link } from 'lucide-react';
import { lazy } from 'react';

// Páginas con lazy loading (las más pesadas)
const AboutPage = lazy(() => import('@pages/About'));
const FaqsPage = lazy(() => import('@pages/Faqs'));
const LinksPage = lazy(() => import('@pages/Links'));
const RedesPage = lazy(() => import('@pages/Redes'));
const ProgramsPage = lazy(() => import('@pages/Programs'));
const ProgramDetailPage = lazy(() => import('@pages/ProgramDetailPage'));

// Página Home sin lazy loading (es simple y se necesita inmediatamente)
import HomePage from '@pages/Home';

/**
 * Configuración central de rutas de la aplicación.
 * Es la ÚNICA FUENTE DE VERDAD para las rutas y la navegación.
 *
 * Cada objeto define:
 * - id: Identificador único.
 * - path: La URL de la ruta.
 * - component: El componente de la página a renderizar.
 * - title: El título de la página para el documento.
 * - nav: (Opcional) Objeto con la configuración para mostrar en menús de navegación.
 */
const mainRoutes = [
  {
    id: 'home',
    path: '/',
    component: HomePage,
    title: 'Home',
    nav: { text: 'Home', icon: Home },
  },
  // {
  //   id: 'about',
  //   path: '/about',
  //   component: AboutPage,
  //   title: 'Sobre Mí',
  //   nav: { text: 'Sobre Mí', icon: User },
  // },
  {
    id: 'redes',
    path: '/redes',
    component: RedesPage,
    title: 'Mis Redes Sociales',
    nav: { text: 'Redes', icon: Share2 },
  },
  {
    id: 'programas',
    path: '/programas',
    component: ProgramsPage,
    title: 'Programas',
    nav: { text: 'Programas', icon: User },
  },
  {
    id: 'programa',
    path: '/programas/:programId',
    component: ProgramDetailPage,
    title: 'Detalle del Programa',
  },
  {
    id: 'faqs',
    path: '/faqs',
    component: FaqsPage,
    title: 'Preguntas Frecuentes',
    nav: { text: 'FAQS', icon: HelpCircle },
  },
];

const simpleRoutes = [
  {
    id: 'links',
    path: '/links',
    component: LinksPage,
    title: 'Links',
    nav: { text: 'Links', icon: Link },
  },
];

export const routeConfig = {
  main: mainRoutes,
  simple: simpleRoutes,
};

export const allRoutes = [...mainRoutes, ...simpleRoutes];
