import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react'; // Importamos los íconos

const Navbar = ({ navLinks = [] }) => {
  // 1. Estado para controlar la visibilidad del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
      <nav className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Tu nombre/logo */}
        <Link 
          to="/" 
          className="text-xl font-bold text-slate-800 dark:text-white"
          onClick={() => setIsMobileMenuOpen(false)} // Cierra el menú si se hace clic en el logo
        >
          Juan Cruz Arbelais
        </Link>
        
        {/* 2. Links para Desktop (ocultos en móvil) */}
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* 3. Botón de Hamburguesa (visible solo en móvil) */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-800 dark:text-slate-200"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Menú desplegable para Móvil */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg pb-4 px-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                className="font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                // Al hacer clic en un link, se cierra el menú
                onClick={() => setIsMobileMenuOpen(false)} 
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;