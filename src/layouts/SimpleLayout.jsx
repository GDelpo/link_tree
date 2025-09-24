import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useActiveSection } from '@/hooks/useActiveSection';
import { linksNavItems } from '@/config/pageSections'; // Importamos los navLinks
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

/**
 * Layout simple que consiste en una barra de navegación superior y el contenido de la página.
 * Recibe los enlaces de navegación para la Navbar a través del contexto del Outlet de React Router.
 */
const SimpleLayout = () => {
  // Obtenemos los navLinks del contexto proporcionado por la ruta en App.jsx.
  // Si no se proporcionan, usamos un array vacío por defecto.
  // Para este layout específico, siempre usaremos los links de la página de Links.
  // Si tuvieras más páginas con este layout, podrías usar useOutletContext() para diferenciarlos.
  const navLinks = linksNavItems;

  // Hook para detectar la sección activa en el scroll y pasarla a la Navbar.
  const activeSection = useActiveSection(navLinks.map(link => link.id));

  return (
    <div className="font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Fondo con gradiente sutil, consistente con MainLayout */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:to-black transition-colors duration-300"></div>
      <Navbar navLinks={navLinks} activeSection={activeSection} />
      <main className="w-full max-w-4xl px-4 pt-16 mx-auto sm:px-6 lg:px-8">
        {/* El Outlet ahora recibe el contexto de la ruta */}
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default SimpleLayout;