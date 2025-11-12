import React, { memo, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { profileData } from '@content';
import { useRoutePreloader } from '@hooks/useRoutePreloader';
import { useFocusManagement, useScreenReader } from '@hooks/useAccessibility';
import Footer from '@components/layout/Footer';

/**
 * Sidebar de navegación principal. Es responsive: se oculta fuera de la pantalla en móvil
 * y es visible permanentemente en escritorio.
 * @param {{ isOpen: boolean, onClose: () => void, navItems: Array }} props
 */
const Sidebar = memo(({ isOpen, onClose, navItems = [] }) => {
  const { preloadRoute } = useRoutePreloader();
  const { saveFocus, restoreFocus, trapFocus } = useFocusManagement();
  const { announce } = useScreenReader();
  const sidebarRef = useRef(null);

  const commonClass =
    'flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900';
  const activeClass =
    'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold';
  const inactiveClass =
    'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1';

  // Manejar escape key y trap focus
  useEffect(() => {
    if (isOpen) {
      saveFocus();
      announce('Menú lateral abierto');

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
          restoreFocus();
          announce('Menú lateral cerrado');
        }
      };

      document.addEventListener('keydown', handleEscape);

      // Trap focus en mobile
      if (window.innerWidth < 768 && sidebarRef.current) {
        const cleanup = trapFocus(sidebarRef);

        return () => {
          document.removeEventListener('keydown', handleEscape);
          cleanup?.();
        };
      }

      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, saveFocus, restoreFocus, trapFocus, announce]);

  const handleNavClick = (item) => {
    announce(`Navegando a ${item.text}`);
    onClose();
    if (window.innerWidth < 768) {
      restoreFocus();
    }
  };

  return (
    <>
      {/* Fondo oscuro que aparece detrás del sidebar en móvil para cerrarlo al hacer clic fuera. */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity opacity-100'
          onClick={() => {
            onClose();
            restoreFocus();
            announce('Menú lateral cerrado');
          }}
          aria-hidden='true'
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-lg border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col p-8 justify-between z-40
                   transition-transform duration-300 ease-in-out
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:translate-x-0`}
        role='complementary'
        aria-label='Navegación principal del sitio'
        aria-hidden={!isOpen && window.innerWidth < 768 ? 'true' : 'false'}
      >
        <div>
          <h1 className='text-3xl font-black tracking-widest text-slate-800 dark:text-white mb-12 px-2'>
            <span className='sr-only'>Sitio web de </span>
            {profileData.name}
          </h1>
          <nav role='navigation' aria-label='Menú de páginas principales'>
            <ul className='flex flex-col gap-2' role='list'>
              {navItems.map((item) => (
                <li key={item.to} role='none'>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `${commonClass} ${isActive ? activeClass : inactiveClass}`
                    }
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => preloadRoute(item.to)}
                    aria-current={({ isActive }) =>
                      isActive ? 'page' : undefined
                    }
                    aria-describedby={`nav-desc-${item.to.replace('/', '') || 'home'}`}
                  >
                    <item.icon size={20} aria-hidden='true' />
                    <span>{item.text}</span>
                    <span
                      id={`nav-desc-${item.to.replace('/', '') || 'home'}`}
                      className='sr-only'
                    >
                      Ir a la página {item.text}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Footer />
      </aside>
    </>
  );
});

export default Sidebar;
