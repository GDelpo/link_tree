import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import { Menu } from 'lucide-react'; // Ícono para el header móvil

const MainLayout = () => {
  // 1. Estado para controlar el sidebar en móvil
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-black text-slate-800 dark:text-slate-200 min-h-screen">
      
      {/* 2. Pasamos el estado y la función para cerrarlo al Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenedor principal que se ajusta responsivamente */}
      <div className="md:ml-64">
        {/* 3. Header visible solo en móvil */}
        <header className="md:hidden sticky top-0 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-4 z-20">
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
        <main className="p-8">
          {/* El ThemeToggle para desktop sigue igual, pero lo ocultamos en móvil */}
          <div className="fixed top-8 right-8 z-50 hidden md:block">
            <ThemeToggle />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;