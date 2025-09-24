import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Un botón flotante que aparece cuando el usuario se desplaza hacia abajo
 * y permite volver al inicio de la página con un scroll suave.
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Muestra u oculta el botón basado en la posición del scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Vuelve al inicio de la página con una animación suave
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg dark:shadow-lg dark:shadow-black/25 overflow-hidden group transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          aria-label="Volver al inicio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="absolute inset-0 bg-gradient-to-br from-sky-500 to-cyan-500 dark:from-sky-600 dark:to-cyan-600 animate-[gradient-x_4s_ease_infinite] transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundSize: '200% 200%' }}
          ></span>
          <ArrowUp size={24} className="relative z-10 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;