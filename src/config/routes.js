import { Home, User, Share2, HelpCircle, Link } from 'lucide-react';
import { lazy } from 'react';

// Páginas con lazy loading (las más pesadas)
const AboutPage = lazy(() => import('@pages/About'));
const FaqsPage = lazy(() => import('@pages/Faqs'));
const LinksPage = lazy(() => import('@pages/Links'));
const RedesPage = lazy(() => import('@pages/Redes'));

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
 * - layout: String que indica el Layout a usar.
 * - nav: (Opcional) Objeto con la configuración para mostrar en menús de navegación.
 */
export const routeConfig = [
  {
    id: 'home',
    path: '/',
    component: HomePage,
    layout: 'main',
    title: 'Home',
    nav: { text: 'Home', icon: Home },
  },
  // {
  //   id: 'about',
  //   path: '/about',
  //   component: AboutPage,
  //   layout: 'main',
  //   title: 'Sobre Mí',
  //   nav: { text: 'Sobre Mí', icon: User },
  // },
  // {
  //   id: 'redes',
  //   path: '/redes',
  //   component: RedesPage,
  //   layout: 'main',
  //   title: 'Mis Redes Sociales',
  //   nav: { text: 'Redes', icon: Share2 },
  // },
  {
    id: 'faqs',
    path: '/faqs',
    component: FaqsPage,
    layout: 'main',
    title: 'Preguntas Frecuentes',
    nav: { text: 'FAQS', icon: HelpCircle },
  },
  {
    id: 'links',
    path: '/links',
    component: LinksPage,
    layout: 'simple', // Esta ruta usa un layout diferente
    title: 'Links',
    nav: { text: 'Links', icon: Link },
  },
];
