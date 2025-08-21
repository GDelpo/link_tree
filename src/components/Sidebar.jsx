import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Briefcase, FileText, Send } from 'lucide-react';

// 1. Acepta props `isOpen` y `onClose` para controlar la visibilidad
const Sidebar = ({ isOpen, onClose }) => {
  const commonClass = "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors";
  const activeClass = "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold";
  const inactiveClass = "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50";

  // Íconos y texto basados en la imagen de referencia
  const navItems = [
    { to: "/", icon: Home, text: "Home" },
    { to: "/about", icon: User, text: "About" },
    { to: "/portfolio", icon: Briefcase, text: "Portfolio" },
    { to: "/news", icon: FileText, text: "News" },
    { to: "/contact", icon: Send, text: "Contact" },
  ];

   return (
    <>
      {/* 2. Overlay que aparece detrás del sidebar en móvil para cerrar al hacer clic fuera */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* 3. Clases dinámicas para la transición y posicionamiento responsivo */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-[#111111] border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col p-8 justify-between z-40
                   transition-transform duration-300 ease-in-out
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:translate-x-0`}
      >
        {/* El contenido interno del sidebar no cambia */}
        <div>
          <div className="text-3xl font-black tracking-widest text-slate-800 dark:text-white mb-12 px-2">
            Juan Cruz Arbelais
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `${commonClass} ${isActive ? activeClass : inactiveClass}`}
                onClick={onClose} // Cierra el menú al hacer clic en un link
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>&copy; 2025 Juan Cruz Arbelais</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;