import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { profileData } from '@/data';

/**
 * Sidebar de navegación principal. Es responsive: se oculta fuera de la pantalla en móvil
 * y es visible permanentemente en escritorio.
 * @param {{ isOpen: boolean, onClose: () => void, navItems: Array }} props
 */
const Sidebar = memo(({ isOpen, onClose, navItems = [] }) => {
  const commonClass = "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200";
  const activeClass = "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold";
  const inactiveClass = "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1";

   return (
    <>
      {/* Fondo oscuro que aparece detrás del sidebar en móvil para cerrarlo al hacer clic fuera. */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-lg border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col p-8 justify-between z-40
                   transition-transform duration-300 ease-in-out
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:translate-x-0`}
        role="dialog"
        aria-modal="true"
      >
        <div>
          <div className="text-3xl font-black tracking-widest text-slate-800 dark:text-white mb-12 px-2">
            {profileData.name}
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `${commonClass} ${isActive ? activeClass : inactiveClass}`}
                onClick={onClose}
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} {profileData.name}</p>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;