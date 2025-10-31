import React, { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreenReader } from '@hooks/useAccessibility';
import PropTypes from 'prop-types';

/**
 * Componente de Acordeón animado. Muestra una lista de items que pueden ser expandidos
 * para mostrar contenido adicional con una transición suave.
 */
const Accordion = memo(({ items = [] }) => {
  // Estado para rastrear qué item del acordeón está actualmente abierto.
  const [openItemId, setOpenItemId] = useState(null);
  const { announce } = useScreenReader();

  /**
   * Maneja el clic en un item del acordeón.
   * Si el item clickeado ya está abierto, lo cierra. Si no, abre el nuevo.
   * @param {string} id - El ID del item clickeado.
   */
  const handleToggleItem = (id) => {
    const wasOpen = openItemId === id;
    setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));

    // Anunciar el cambio de estado
    const item = items.find((item) => item.id === id);
    if (item) {
      announce(wasOpen ? `${item.title} cerrado` : `${item.title} abierto`);
    }
  };

  return (
    <div className='w-full'>
      {items.map((item, index) => {
        const isOpen = openItemId === item.id;
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`border-slate-200 dark:border-slate-700 ${index < items.length - 1 ? 'border-b' : ''} transition-colors duration-300`}
          >
            {/* Botón que actúa como cabecera del item del acordeón */}
            <button
              onClick={() => handleToggleItem(item.id)}
              className='w-full flex justify-between items-start text-left py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-lg'
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
              aria-describedby={`accordion-desc-${item.id}`}
            >
              <div className='flex items-start gap-4'>
                {Icon && (
                  <Icon
                    className='h-6 w-6 text-sky-500 mt-1 flex-shrink-0'
                    aria-hidden='true'
                  />
                )}
                <div className='flex-1'>
                  <h3 className='font-semibold text-lg text-slate-800 dark:text-slate-100'>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p
                      id={`accordion-desc-${item.id}`}
                      className='text-sm text-slate-500 dark:text-slate-400 mt-1'
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-slate-500 dark:text-slate-400 transform transition-transform duration-300 mt-1 ml-4 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden='true'
              />
              <span className='sr-only'>
                {isOpen ? 'Cerrar sección' : 'Abrir sección'}
              </span>
            </button>

            {/* Contenido colapsable con animación de entrada y salida */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.section
                  id={`accordion-content-${item.id}`}
                  initial='collapsed'
                  animate='open'
                  exit='collapsed'
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className='overflow-hidden'
                  role='region'
                  aria-labelledby={`accordion-header-${item.id}`}
                >
                  <div className='text-slate-600 dark:text-slate-400 leading-relaxed pt-2 pb-4'>
                    {item.collapsibleContent}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
});

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      description: PropTypes.string,
      collapsibleContent: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Accordion;
