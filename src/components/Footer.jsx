import React from 'react';
import { profileData } from '@content';

/**
 * Componente de pie de página simple y centrado.
 * Muestra el aviso de copyright con el año actual y el nombre del perfil.
 */
const Footer = () => {
  return (
    <footer 
      role="contentinfo" 
      className="w-full py-8 mt-16 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300 select-none"
      aria-label="Información de pie de página"
    >
      <p>&copy; {new Date().getFullYear()} {profileData.name}</p>
      <p className="mt-4 text-xs font-mono">
        Made with <span className="text-red-500 animate-pulse" role="img" aria-label="corazón">♥</span> by{' '}
        <a
          href="https://github.com/GDelpo"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-sky-500 dark:hover:text-sky-400"
          aria-label="Visitar perfil de GitHub de Guido Delponte (se abre en una nueva ventana)"
        >
          Guido Delponte
        </a>
      </p>
    </footer>
  );
};

export default Footer;