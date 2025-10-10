import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Smartphone, Dumbbell, Star, CreditCard, ExternalLink, MapPin } from 'lucide-react';
import { useKeyboardNavigation, useFocusManagement } from '@hooks/useAccessibility';
import { programsData, getSmartPrice, getSmartPriceDisplay } from '../content/programs.js';
import { generateWhatsAppLink } from '../content/contact.js';
import { useLocationContext, LocationIndicator } from '../contexts/LocationContext.jsx';
import { SmartPricingSection } from './SmartPricing.jsx';
import { SmartPaymentSection } from './SmartPayment.jsx';
import Portal from './Portal';



const ProgramDetailModal = ({ program, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { trapFocus, restoreFocus } = useFocusManagement();
  const { isArgentina, isLoading: locationLoading, country } = useLocationContext();
  
  // Helper function para obtener el precio principal a mostrar (ahora inteligente)
  const getPrimaryPrice = (priceStructure) => {
    if (locationLoading) return "Detectando precio...";
    return getSmartPriceDisplay(priceStructure, isArgentina);
  };
  
  // Keyboard navigation para cerrar con Escape
  const keyMappings = {
    'Escape': onClose
  };
  useKeyboardNavigation(keyMappings, isOpen);

  // Trap focus cuando el modal está abierto
  useEffect(() => {
    if (isOpen && modalRef.current) {
      trapFocus(modalRef.current);
      closeButtonRef.current?.focus();
      
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
        restoreFocus();
      };
    }
  }, [isOpen, trapFocus, restoreFocus]);

  if (!program) return null;

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <Portal id="modal-portal">
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
            
            {/* Modal */}
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
            {/* Header - Fijo */}
            <div className={`flex-shrink-0 p-6 bg-gradient-to-r ${program.gradientClasses} text-white relative overflow-hidden`}>
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {program.Icon && (
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <program.Icon className="w-8 h-8" />
                      </div>
                    )}
                    <div>
                      <h2 id="modal-title" className="text-3xl font-bold mb-2">
                        {program.emoji} {program.title}
                      </h2>
                      <p className="text-white/90 text-lg font-medium">
                        {program.shortDescription}
                      </p>
                    </div>
                  </div>
                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label="Cerrar información del programa"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Quick stats */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">{program.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">{getPrimaryPrice(program.price)}</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            </div>

            {/* Content - Scrolleable */}
            <div 
              className="flex-1 overflow-y-auto modal-scroll" 
              id="modal-description"
            >
              <div className="p-6 space-y-8">
                
                {/* Target Audience */}
                <section aria-labelledby="target-heading">
                  <h3 id="target-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-sky-600" />
                    ¿Para quién es este programa?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {program.targetAudience}
                  </p>
                </section>

                {/* Description */}
                <section aria-labelledby="description-heading">
                  <h3 id="description-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    Descripción del Programa
                  </h3>
                  <div className="space-y-4">
                    {program.description.map((paragraph, index) => (
                      <p key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>

                {/* Access & Platform */}
                <section aria-labelledby="access-heading">
                  <h3 id="access-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-sky-600" />
                    Acceso y Plataforma
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-3 font-medium">
                    {program.access.platform}
                  </p>
                  <ul className="space-y-2">
                    {program.access.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <span className="w-2 h-2 bg-sky-600 rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Equipment */}
                <section aria-labelledby="equipment-heading">
                  <h3 id="equipment-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-sky-600" />
                    Equipamiento Necesario
                  </h3>
                  <ul className="space-y-2">
                    {program.equipment.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Bonus Features */}
                {program.bonusFeatures && program.bonusFeatures.length > 0 && (
                  <section aria-labelledby="bonus-heading">
                    <h3 id="bonus-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      Características Especiales
                    </h3>
                    <div className="space-y-4">
                      {program.bonusFeatures.map((feature, index) => (
                        <div key={index} className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-amber-700 dark:text-amber-300 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Smart Pricing Section */}
                <section aria-labelledby="pricing-heading">
                  <h3 id="pricing-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    Precios y Opciones
                  </h3>
                  <SmartPricingSection program={program} />
                  
                  {program.specialNote && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                        ⚡ {program.specialNote}
                      </p>
                    </div>
                  )}
                </section>

                {/* Smart Payment & Contact Section */}
                <section aria-labelledby="payment-heading">
                  <h3 id="payment-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    Pago y Contacto
                  </h3>
                  <SmartPaymentSection program={program} />
                </section>
              </div>
            </div>


          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </Portal>
  );
};

export default ProgramDetailModal;