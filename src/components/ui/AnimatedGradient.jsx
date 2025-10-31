import React from 'react';
import {
  SKY_GRADIENT_CLASSES,
  EMERALD_GRADIENT_CLASSES,
} from '@/utils/constants';

/**
 * Componente para fondos con gradiente animado reutilizable
 * @param {{
 *   variant?: 'sky' | 'emerald' | 'custom',
 *   customGradient?: string,
 *   className?: string,
 *   children?: React.ReactNode
 * }} props
 */
const AnimatedGradient = ({
  variant = 'sky',
  customGradient = '',
  className = '',
  children,
}) => {
  const gradientClasses = {
    sky: SKY_GRADIENT_CLASSES,
    emerald: EMERALD_GRADIENT_CLASSES,
    custom: customGradient,
  };

  const baseClasses =
    'absolute inset-0 bg-gradient-to-br animate-[gradient-x_4s_ease_infinite] transition-transform duration-300 group-hover:scale-110';
  const gradientClass = gradientClasses[variant];

  return (
    <span
      className={`${baseClasses} ${gradientClass} ${className}`}
      style={{ backgroundSize: '200% 200%' }}
    >
      {children}
    </span>
  );
};

export default AnimatedGradient;
