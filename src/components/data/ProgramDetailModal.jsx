import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  Users,
  CreditCard,
} from 'lucide-react';
import PropTypes from 'prop-types';
import {
  useKeyboardNavigation,
  useFocusManagement,
} from '@hooks/useAccessibility';
import { getSmartPriceDisplay } from '@/utils/programUtils.js';
import {
  useLocationContext,
} from '@contexts/LocationContext.jsx';
// Inline Portal implementation (previously @components/layout/Portal)
import { createPortal } from 'react-dom';
import ProgramDetailContent from './ProgramDetailContent';

const usePortal = (id = 'portal-root') => {
  const [container, setContainer] = React.useState(null);
  useEffect(() => {
    let portalContainer = document.getElementById(id);
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = id;
      portalContainer.style.position = 'relative';
      portalContainer.style.zIndex = '9999';
      document.body.appendChild(portalContainer);
    }
    setContainer(portalContainer);
    return () => {
      if (portalContainer && portalContainer.children.length === 0) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [id]);
  return container;
};

const Portal = ({ children, id = 'portal-root' }) => {
  const container = usePortal(id);
  return container ? createPortal(children, container) : null;
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

const ProgramDetailModal = ({ program, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { trapFocus, restoreFocus } = useFocusManagement();
  const { isArgentina, isLoading: locationLoading } = useLocationContext();

  // Helper function para obtener el precio principal a mostrar (ahora inteligente)
  const getPrimaryPrice = (priceStructure) => {
    if (locationLoading) return 'Detectando precio...';
    return getSmartPriceDisplay(priceStructure, isArgentina);
  };

  // Keyboard navigation para cerrar con Escape
  const keyMappings = {
    Escape: onClose,
  };
  useKeyboardNavigation(keyMappings, isOpen);

  // Trap focus cuando el modal está abierto
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    trapFocus(modalRef.current);
    closeButtonRef.current?.focus();

    // Prevenir scroll del body
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
      restoreFocus();
    };
  }, [isOpen, trapFocus, restoreFocus]);

  if (!program) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Portal id='modal-portal'>
      <AnimatePresence>
        {isOpen && (
          <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4'>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='absolute inset-0 bg-black/60 backdrop-blur-sm'
              onClick={onClose}
              aria-hidden='true'
            />

            {/* Modal */}
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='relative w-full max-w-4xl h-[90vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-title'
              aria-describedby='modal-description'
            >
              {/* Header - Más compacto */}
              <div
                className={`flex-shrink-0 p-4 bg-gradient-to-r ${program.gradientClasses} text-white relative overflow-hidden`}
              >
                <div className='relative z-10'>
                  {/* Primera fila: Título y botón de cerrar */}
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      {program.Icon && (
                        <div className='p-2 bg-white/20 rounded-lg backdrop-blur-sm'>
                          <program.Icon className='w-6 h-6' />
                        </div>
                      )}
                      <div>
                        <h2 id='modal-title' className='text-xl font-bold'>
                          {program.emoji} {program.title}
                        </h2>
                      </div>
                    </div>
                    <button
                      ref={closeButtonRef}
                      onClick={onClose}
                      className='p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent'
                      aria-label='Cerrar información del programa'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  </div>

                  {/* Segunda fila: Descripción corta */}
                  <p className='text-white/90 text-sm font-medium mb-3'>
                    {program.shortDescription}
                  </p>

                  {/* Tercera fila: Stats compactos en una sola línea */}
                  <div className='flex flex-wrap gap-2 text-xs'>
                    <div className='flex items-center gap-1 bg-white/20 rounded px-2 py-1 backdrop-blur-sm'>
                      <Clock className='w-3 h-3' />
                      <span>{program.duration}</span>
                    </div>
                    <div className='flex items-center gap-1 bg-white/20 rounded px-2 py-1 backdrop-blur-sm'>
                      <Users className='w-3 h-3' />
                      <span>{program.frequency}</span>
                    </div>
                    <div className='flex items-center gap-1 bg-white/20 rounded px-2 py-1 backdrop-blur-sm'>
                      <CreditCard className='w-3 h-3' />
                      <span>{getPrimaryPrice(program.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Decorative background */}
                <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32' />
                <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24' />
              </div>

              {/* Content - Scrolleable */}
              <div
                className='flex-1 overflow-y-auto modal-scroll'
                id='modal-description'
              >
                <ProgramDetailContent program={program} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

ProgramDetailModal.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    emoji: PropTypes.string,
    shortDescription: PropTypes.string,
    gradientClasses: PropTypes.string,
    Icon: PropTypes.elementType,
    duration: PropTypes.string,
    frequency: PropTypes.string,
    price: PropTypes.object,
    targetAudience: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    access: PropTypes.shape({
      platform: PropTypes.string,
      features: PropTypes.arrayOf(PropTypes.string),
    }),
    equipment: PropTypes.arrayOf(PropTypes.string),
    bonusFeatures: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    specialNote: PropTypes.string,
    paymentMethods: PropTypes.shape({
      local: PropTypes.arrayOf(PropTypes.string),
      international: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProgramDetailModal;
