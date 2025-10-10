import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Smartphone, Dumbbell, Star, CreditCard, ExternalLink } from 'lucide-react';
import { useKeyboardNavigation, useFocusManagement } from '@hooks/useAccessibility';
import { programsData } from '../content/programs.js';
import { generateWhatsAppLink } from '../content/contact.js';
import Portal from './Portal';

// Helper function para renderizar detalles de precios según estructura
const renderPricingDetails = (program) => {
  const { price } = program;
  
  if (!price) return <p className="text-slate-600 dark:text-slate-400">Consultar precio</p>;
  
  // Estructura simple: { local: "...", international: "..." }
  if (price.local && price.international) {
    return (
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{price.local}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Argentina</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{price.international}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Internacional</div>
          </div>
        </div>
      </div>
    );
  }
  
  // Estructura compleja con múltiples opciones
  const priceKeys = Object.keys(price);
  if (priceKeys.length > 0) {
    return (
      <div className="space-y-3">
        {priceKeys.map((key, index) => {
          const priceOption = price[key];
          const duration = key.replace('weeks', ' semanas');
          
          return (
            <div key={key} className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-slate-800 dark:text-white capitalize">
                  {duration === 'regular' ? 'Precio Regular' : 
                   duration === 'launch' ? 'Precio Lanzamiento' : 
                   `Programa ${duration}`}
                </h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                {priceOption.local && (
                  <div>
                    <div className="text-xl font-bold text-slate-800 dark:text-white">{priceOption.local}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Argentina</div>
                  </div>
                )}
                {priceOption.international && (
                  <div className={priceOption.local ? '' : 'col-span-2'}>
                    <div className="text-xl font-bold text-slate-800 dark:text-white">{priceOption.international}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Internacional</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  return <p className="text-slate-600 dark:text-slate-400">Consultar precio</p>;
};

const ProgramDetailModal = ({ program, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { trapFocus, restoreFocus } = useFocusManagement();
  
  // Helper function para obtener el precio principal a mostrar
  const getPrimaryPrice = (priceStructure) => {
    if (!priceStructure) return "Consultar";
    
    // Si tiene estructura simple (local/international)
    if (priceStructure.local && priceStructure.international) {
      return `${priceStructure.local} / ${priceStructure.international}`;
    }
    
    // Si tiene estructura compleja con múltiples duraciones
    const keys = Object.keys(priceStructure);
    if (keys.length === 0) return "Consultar";
    
    // Tomar el primer precio disponible
    const firstKey = keys[0];
    const firstPrice = priceStructure[firstKey];
    
    if (firstPrice.local && firstPrice.international) {
      return `${firstPrice.local} / ${firstPrice.international}`;
    } else if (firstPrice.international) {
      return firstPrice.international;
    }
    
    return "Consultar";
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

                {/* Pricing Details */}
                <section aria-labelledby="pricing-heading">
                  <h3 id="pricing-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    Precios y Opciones
                  </h3>
                  {renderPricingDetails(program)}
                  
                  {/* Special offers */}
                  {program.specialOffer && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-l-4 border-orange-500">
                      <p className="text-orange-800 dark:text-orange-200 font-semibold text-sm">
                        🔥 {program.specialOffer}
                      </p>
                    </div>
                  )}
                  
                  {program.specialNote && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                        ⚡ {program.specialNote}
                      </p>
                    </div>
                  )}
                </section>

                {/* Payment Methods */}
                <section aria-labelledby="payment-heading">
                  <h3 id="payment-heading" className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    Medios de Pago
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Argentina</h4>
                      <ul className="space-y-1">
                        {program.paymentMethods.local.map((method, index) => (
                          <li key={index} className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                            {method}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Internacional</h4>
                      <ul className="space-y-1">
                        {program.paymentMethods.international.map((method, index) => (
                          <li key={index} className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            {method}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer with CTA - Fijo */}
            <div className="flex-shrink-0 p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shadow-lg shadow-slate-900/10 dark:shadow-black/30">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    ¿Listo para comenzar?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Consultá cualquier duda o comenzá tu transformación ahora
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-lg"
                  >
                    Cerrar
                  </button>
                  <a
                    href={generateWhatsAppLink(program.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r ${program.gradientClasses} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white dark:focus:ring-offset-slate-900`}
                    aria-label={`Consultar sobre ${program.title} por WhatsApp (se abre en una nueva ventana)`}
                  >
                    Consultar
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
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