import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react'; // Importamos los íconos
import { profileData } from '../data/content';

/**
 * Componente interno para renderizar una lista de enlaces de navegación.
 * Se reutiliza para la vista de escritorio y el menú móvil.
 */
const NavLinksList = memo(({ links, onLinkClick, linkClassName }) => (
  <>
    {links.map((link) => (
      <a
        key={link.id}
        href={`#${link.id}`}
        className={linkClassName}
        onClick={onLinkClick}
      >
        {link.text}
      </a>
    ))}
  </>
));

/**
 * Barra de navegación principal. Es pegajosa (sticky) y muestra el logo,
 * enlaces de navegación (si los hay) y un conmutador de tema.
 * @param {{ navLinks: Array<{id: string, text: string}> }} props
 */
const Navbar = memo(({ navLinks = [] }) => {
  // Controla la visibilidad del menú desplegable en dispositivos móviles.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
      <nav className="container mx-auto px-4 h-16 flex justify-between items-center relative">
        <Link 
          to="/" 
          className="text-xl font-black tracking-widest text-slate-800 dark:text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {profileData.name}
        </Link>
        
        {/* Enlaces de navegación para escritorio, centrados absolutamente. */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          <NavLinksList
            links={navLinks}
            linkClassName="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="sm:hidden"> {/* Contenedor del botón de menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-800 dark:text-slate-200"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú desplegable para móvil */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg pb-4 px-4">
          <nav className="flex flex-col gap-4">
            <NavLinksList
              links={navLinks}
              linkClassName="font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
          </nav>
        </div>
      )}
    </header>
  );
});

export default Navbar;