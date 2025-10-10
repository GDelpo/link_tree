import React, { useState, memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react'; // Importamos los íconos
import { profileData } from '@content';
import { useRoutePreloader } from '@hooks/useRoutePreloader';
import { useFocusManagement, useScreenReader } from '@hooks/useAccessibility';

/**
 * Componente interno para renderizar una lista de enlaces de navegación.
 * Se reutiliza para la vista de escritorio y el menú móvil.
 */
const NavLinksList = memo(({ links, onLinkClick, activeSection, isMobile = false }) => {
  const { preloadRoute } = useRoutePreloader();
  const { announce } = useScreenReader();
  
  const handleLinkClick = (e, linkId) => {
    e.preventDefault();
    const element = document.getElementById(linkId);

    if (element) {
      // La cabecera sticky tiene una altura de h-16 (4rem o 64px).
      // Necesitamos compensar la posición de scroll para evitar que el título de la sección quede oculto.
      const headerOffset = 64; // h-16 = 4rem = 64px
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    // Anunciar navegación a screen readers
    announce(`Navegando a sección ${linkId}`);
    
    // Si se pasa un manejador (ej. para cerrar el menú móvil), lo llamamos.
    if (onLinkClick) {
      onLinkClick(e);
    }
  };

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = activeSection === link.id;
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
              isActive
                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                : "text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400"
            }`}
            onClick={(e) => handleLinkClick(e, link.id)}
            onMouseEnter={() => preloadRoute(`/${link.id}`)}
            aria-current={isActive ? 'page' : undefined}
            aria-describedby={`nav-desc-${link.id}`}
            role={isMobile ? 'menuitem' : undefined}
          >
            {Icon && <Icon size={16} aria-hidden="true" />}
            <span>{link.text}</span>
            <span id={`nav-desc-${link.id}`} className="sr-only">
              {isActive ? 'Sección actual' : `Navegar a sección ${link.text}`}
            </span>
          </a>
        );
      })}
    </>
  );
});

/**
 * Barra de navegación principal. Es pegajosa (sticky) y muestra el logo,
 * enlaces de navegación (si los hay) y un conmutador de tema.
 * @param {{ navLinks: Array<{id: string, text: string, icon?: React.ElementType}>, activeSection?: string }} props
 */
const Navbar = memo(({ navLinks = [], activeSection }) => {
  // Controla la visibilidad del menú desplegable en dispositivos móviles.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { saveFocus, restoreFocus, trapFocus } = useFocusManagement();
  const { announce } = useScreenReader();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Manejar escape key para cerrar menú móvil
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        restoreFocus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, restoreFocus]);

  // Trap focus cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const cleanup = trapFocus(mobileMenuRef);
      return cleanup;
    }
  }, [isMobileMenuOpen, trapFocus]);

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      saveFocus();
      announce('Menú de navegación abierto');
    } else {
      announce('Menú de navegación cerrado');
      restoreFocus();
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300" role="banner">
      <nav className="container mx-auto px-4 h-16 flex justify-between items-center relative" role="navigation" aria-label="Navegación principal">
        <Link 
          to="/" 
          className="text-xl font-black tracking-widest text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label={`${profileData.name} - Ir al inicio`}
        >
          {profileData.name}
        </Link>
        
        {/* Enlaces de navegación para escritorio, centrados absolutamente. */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2" role="menubar" aria-label="Navegación de secciones">
          <NavLinksList links={navLinks} activeSection={activeSection} />
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="sm:hidden"> {/* Contenedor del botón de menú móvil */}
            <button
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="menu"
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú desplegable para móvil */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          ref={mobileMenuRef}
          className="sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg p-2 transition-colors duration-300 border-t border-slate-200/50 dark:border-slate-700/50"
          role="menu"
          aria-labelledby="mobile-menu-button"
        >
          <nav className="flex flex-col gap-1" role="none">
            <NavLinksList
              links={navLinks}
              activeSection={activeSection}
              onLinkClick={() => {
                setIsMobileMenuOpen(false);
                restoreFocus();
              }}
              isMobile={true}
            />
          </nav>
        </div>
      )}
    </header>
  );
});

export default Navbar;