import React, { memo } from 'react';

/**
 * Componente genérico de tarjeta con diferentes variantes de estilo
 * @param {{
 *   children: React.ReactNode,
 *   variant?: 'default' | 'glass' | 'solid' | 'minimal',
 *   className?: string,
 *   padding?: 'sm' | 'md' | 'lg' | 'xl',
 *   rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 * }} props
 */
const Card = memo(({ 
  children, 
  variant = 'default', 
  className = '', 
  padding = 'md',
  rounded = 'xl'
}) => {
  const baseClasses = 'transition-colors duration-300';
  
  const variantClasses = {
    default: 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-black/5 dark:shadow-black/20',
    glass: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg ring-1 ring-slate-900/5 overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-sky-950/20',
    solid: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg dark:shadow-lg dark:shadow-sky-950/20',
    minimal: 'bg-slate-100/50 dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-700 shadow-md'
  };

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  return (
    <div className={`
      ${baseClasses}
      ${variantClasses[variant]}
      ${paddingClasses[padding]}
      ${roundedClasses[rounded]}
      ${className}
    `}>
      {children}
    </div>
  );
});

export default Card;