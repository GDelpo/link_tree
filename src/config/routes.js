import React from 'react';
import { Home, User, Share2, HelpCircle, Link } from 'lucide-react';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import SimpleLayout from '@/layouts/SimpleLayout';

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
 * - layout: El Layout que envuelve a la página.
 * - nav: (Opcional) Objeto con la configuración para mostrar en menús de navegación.
 */
export const routeConfig = [
  {
    id: 'home',
    path: '/',
    component: <HomePage />,
    layout: MainLayout,
    nav: { text: 'Home', icon: Home },
  },
  {
    id: 'about',
    path: '/about',
    component: <AboutPage />,
    layout: MainLayout,
    nav: { text: 'Sobre Mí', icon: User },
  },
  {
    id: 'redes',
    path: '/redes',
    component: <RedesPage />,
    layout: MainLayout,
    nav: { text: 'Redes', icon: Share2 },
  },
  {
    id: 'faqs',
    path: '/faqs',
    component: <FaqsPage />,
    layout: MainLayout,
    nav: { text: 'FAQS', icon: HelpCircle },
  },
  {
    id: 'links',
    path: '/links',
    component: <LinksPage />,
    layout: SimpleLayout, // Esta ruta usa un layout diferente
    nav: { text: 'Links', icon: Link },
  },
];