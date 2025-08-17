import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-full 
        text-slate-800 dark:text-slate-200
        bg-white/70 hover:bg-white
        dark:bg-slate-800/70 dark:hover:bg-slate-700
        backdrop-blur-sm 
        ring-1 ring-black/5 dark:ring-white/10 
        shadow-lg shadow-black/5 dark:shadow-black/20
        transition-colors duration-200"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;