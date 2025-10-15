import React, { memo } from 'react';

/**
 * Tarjeta contenedora con estilos consistentes (fondo, borde, sombra)
 * para agrupar contenido relacionado.
 * @param {{ 
 *   children: React.ReactNode, 
 *   className?: string, 
 *   role?: string, 
 *   ariaLabel?: string,
 *   tabIndex?: number 
 * }} props
 */
const ContentCard = memo(({ 
  children, 
  className = '', 
  role = "article",
  ariaLabel,
  tabIndex 
}) => (
  <div 
    className={`bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50 transition-shadow duration-200 ${className}`}
    role={role}
    aria-label={ariaLabel}
    tabIndex={tabIndex}
  >
    {children}
  </div>
));

export default ContentCard;