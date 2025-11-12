import { useEffect, useState } from 'react';

export const useTheme = () => {
  // Estado para saber si el modo oscuro está activo
  const [isDark, setIsDark] = useState(() => {
    // Revisa si ya hay un tema guardado en localStorage
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      // Si no hay nada, usa la preferencia del sistema operativo
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Valor por defecto si window no está disponible
  });

  // Este efecto se ejecuta cada vez que 'isDark' cambia
  useEffect(() => {
    const root = window.document.documentElement; // La etiqueta <html>

    // Añade o quita la clase 'dark' del HTML
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Guarda la preferencia actual en localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // La función para cambiar el tema
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Devuelve el estado y la función para que los componentes los usen
  return { isDark, toggleTheme };
};
