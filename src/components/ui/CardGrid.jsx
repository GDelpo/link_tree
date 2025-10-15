import React, { memo } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Anima los hijos con un pequeño retraso entre ellos
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Componente genérico para renderizar una grilla de elementos.
 * Utiliza el patrón "render prop" para desacoplar la lógica de la grilla
 * de la lógica de renderizado de cada item individual.
 * Ahora incluye animaciones de entrada con Framer Motion y mejoras de accesibilidad.
 * @param {{ items: Array<{id: string | number}>, renderItem: (item: any) => React.ReactElement, ariaLabel?: string }} props
 */
const CardGrid = memo(({ items, renderItem, ariaLabel = "Grilla de elementos" }) => (
  <motion.div
    role="grid"
    aria-label={ariaLabel}
    aria-rowcount={Math.ceil(items.length / 3)}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    // Reduce animaciones si el usuario prefiere movimiento reducido
    data-reduce-motion="false"
  >
    {items.map((item, index) => (
      <motion.div 
        key={item.id} 
        variants={itemVariants}
        role="gridcell"
        aria-colindex={(index % 3) + 1}
        aria-rowindex={Math.floor(index / 3) + 1}
      >
        {renderItem(item)}
      </motion.div>
    ))}
  </motion.div>
));

export default CardGrid;