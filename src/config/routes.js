import { Home, User, Share2, HelpCircle, Link } from 'lucide-react';

// Pages
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import FaqsPage from '@/pages/Faqs';
import LinksPage from '@/pages/Links';
import RedesPage from '@/pages/Redes';

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
    nav: { text: 'Home', icon: Home },
  },
  {
    id: 'about',
    path: '/about',
    component: AboutPage,
    layout: 'main',
    nav: { text: 'Sobre Mí', icon: User },
  },
  {
    id: 'redes',
    path: '/redes',
    component: RedesPage,
    layout: 'main',
    nav: { text: 'Redes', icon: Share2 },
  },
  {
    id: 'faqs',
    path: '/faqs',
    component: FaqsPage,
    layout: 'main',
    nav: { text: 'FAQS', icon: HelpCircle },
  },
  {
    id: 'links',
    path: '/links',
    component: LinksPage,
    layout: 'simple', // Esta ruta usa un layout diferente
    nav: { text: 'Links', icon: Link },
  },
];
