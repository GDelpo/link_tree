import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGradient from '@components/ui/AnimatedGradient';

/**
 * Componente genérico para botones flotantes de acción
 * @param {{
 *   isVisible: boolean,
 *   href?: string,
 *   onClick?: () => void,
 *   icon: React.ElementType,
 *   gradientColors: string,
 *   ariaLabel: string,
 *   position?: string,
 *   className?: string,
 *   focusRingColor?: string,
 *   description?: string
 * }} props
 */
const FloatingActionButton = ({
  isVisible,
  href,
  onClick,
  icon: Icon,
  gradientColors,
  ariaLabel,
  position = 'bottom-8',
  className = '',
  focusRingColor = 'focus:ring-sky-500',
  description = ''
}) => {
  const buttonClasses = `
    fixed ${position} right-8 z-50 flex h-12 w-12 items-center justify-center 
    rounded-full shadow-lg dark:shadow-lg dark:shadow-black/25 overflow-hidden group 
    transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 
    ${focusRingColor} focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${className}
  `;

  const content = (
    <>
      <AnimatedGradient variant="custom" customGradient={gradientColors} />
      <Icon size={24} className="relative z-10 text-white" aria-hidden="true" />
      {description && <span className="sr-only">{description}</span>}
    </>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses}
              aria-label={ariaLabel}
            >
              {content}
            </a>
          ) : (
            <button
              onClick={onClick}
              className={buttonClasses}
              aria-label={ariaLabel}
            >
              {content}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;