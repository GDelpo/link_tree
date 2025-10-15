import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@components/layout/Sidebar';
import ThemeToggle from '@components/ui/ThemeToggle';
import SkipLink from '@components/ui/SkipLink';
import { Menu } from 'lucide-react'; // Íconos para el header móvil
import FloatingButtons from '@components/ui/FloatingButtons';
import { useDocumentTitle } from '@hooks/useDocumentTitle';
import { routeConfig } from '@config/routes';

const MainLayout = ({ navItems }) => {
  // 1. Estado para controlar el sidebar en móvil
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // 2. Obtener la ruta actual y establecer el título dinámico
  const location = useLocation();
  const currentRoute = routeConfig.find(route => route.path === location.pathname);
  const pageTitle = currentRoute?.title || 'Home';
  
  // 3. Usar el hook para actualizar el título del documento
  useDocumentTitle(pageTitle);

  return (
    <div className="font-sans bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-200 min-h-screen transition-colors duration-300">
      {/* Skip link para accesibilidad */}
      <SkipLink />
      
      {/* Fondo con gradiente sutil, aplicado a todo el layout */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:to-black"></div>

      {/* 2. Pasamos el estado, la función de cierre y los items de navegación al Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} navItems={navItems} />

      {/* Contenedor principal que se ajusta responsivamente */}
      <div className="md:ml-64">
        {/* 3. Header visible solo en móvil */}
        <header className="md:hidden sticky top-0 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-4 z-20 transition-colors duration-300">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <ThemeToggle />
        </header>

        {/* 4. El contenido principal ahora tiene un padding que antes estaba en <main> */}
        <main id="main-content" className="p-8" role="main" tabIndex="-1">
          {/* El ThemeToggle para desktop sigue igual, pero lo ocultamos en móvil */}
          <div className="fixed top-8 right-8 z-50 hidden md:block">
            <ThemeToggle />
          </div>
          <Outlet />
        </main>
        <FloatingButtons />      
      </div>
    </div>
  );
};

export default MainLayout;