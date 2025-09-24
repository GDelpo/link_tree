import React from 'react';
import { profileData } from '@/data';

/**
 * Componente de pie de página simple y centrado.
 * Muestra el aviso de copyright con el año actual y el nombre del perfil.
 */
const Footer = () => {
  return (
    <footer className="w-full py-8 mt-16 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300 select-none">
      <p>&copy; {new Date().getFullYear()} {profileData.name}</p>
      <p className="mt-4 text-xs font-mono">
        Made with <span className="text-red-500 animate-pulse">♥</span> by{' '}
        <a
          href="https://github.com/GDelpo"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-sky-500 dark:hover:text-sky-400"
        >
          Guido Delponte
        </a>
      </p>
    </footer>
  );
};

export default Footer;