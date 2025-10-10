import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';
import { useScreenReader } from '@hooks/useAccessibility';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const { announce } = useScreenReader();

  const handleToggle = () => {
    toggleTheme();
    const newTheme = !isDark ? 'oscuro' : 'claro';
    announce(`Tema cambiado a modo ${newTheme}`);
  };

  return (
    <button
      onClick={handleToggle}
      className="
        p-2 rounded-full 
        text-slate-800 dark:text-slate-200
        bg-white/70 hover:bg-white
        dark:bg-slate-800/70 dark:hover:bg-slate-700
        backdrop-blur-sm 
        ring-1 ring-black/5 dark:ring-white/10 
        shadow-lg shadow-black/5 dark:shadow-black/20
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
      aria-pressed={isDark}
      role="switch"
    >
      {isDark ? (
        <Sun className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5" aria-hidden="true" />
      )}
      <span className="sr-only">
        {isDark ? 'Modo oscuro activo' : 'Modo claro activo'}
      </span>
    </button>
  );
};

export default ThemeToggle;