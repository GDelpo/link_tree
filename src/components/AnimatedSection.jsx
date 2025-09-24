import React from 'react';
import { motion } from 'framer-motion';

/**
 * Un componente contenedor que aplica una animación de "fade-up"
 * cuando entra en el viewport.
 * @param {{ children: React.ReactNode, className?: string }} props
 */
const AnimatedSection = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Se activa cuando el 20% del elemento es visible
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;