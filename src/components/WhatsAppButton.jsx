// components/WhatsAppButton.jsx

import React, { useState, useEffect } from 'react';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_PHONE } from '@/data/contact';

const WhatsAppButton = ({ isPushedUp }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Sigue apareciendo a los 2 segundos
    return () => clearTimeout(timer);
  }, []);
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}`;

  // Lógica para las clases:
  // Si isPushedUp es true, le ponemos 'bottom-24'.
  // Si no, se queda con 'bottom-8'.
  // El 'bottom-24' es la suma de: 
  //   - bottom-8 (32px) del botón de abajo
  //   - h-12 (48px) de la altura del botón de abajo
  //   - un margen de 4 (16px) entre los botones
  //   - Total: 32 + 48 + 16 = 96px, que en Tailwind es `bottom-24`
  const positionClass = isPushedUp ? 'bottom-24' : 'bottom-8';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          // 👇 Usamos la clase dinámica y agregamos una transición para el movimiento
          className={`fixed ${positionClass} right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg dark:shadow-lg dark:shadow-black/25 overflow-hidden group transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900`}
          aria-label="Contactar por WhatsApp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 animate-[gradient-x_4s_ease_infinite] transition-transform duration-300 group-hover:scale-110" style={{ backgroundSize: '200% 200%' }}></span>
          <SiWhatsapp size={24} className="relative z-10 text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;