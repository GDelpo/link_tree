// components/ScrollToTopButton.jsx

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && ( // Usa la prop para decidir si se muestra
        <motion.button
          onClick={scrollToTop}
          // La clase de posicionamiento sigue igual
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