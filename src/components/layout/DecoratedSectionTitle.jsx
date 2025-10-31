import React, { memo } from 'react';

/**
 * Componente para renderizar un título de sección con línea vertical decorativa
 * Ahora es un contenedor que acepta cualquier elemento heading como children
 * @param {{ children: React.ReactNode, className?: string }} props
 */
const DecoratedSectionTitle = memo(({ children, className = '' }) => (
  <div
    className={`relative pl-4 mb-6
                 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-full after:bg-sky-600 ${className}`}
  >
    {/* Aplicamos estilos al children si es un heading */}
    {React.isValidElement(children) &&
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(children.type) ? (
      React.cloneElement(children, {
        className: `text-2xl font-bold text-slate-800 dark:text-white uppercase tracking-wider ${children.props.className || ''}`,
      })
    ) : (
      <div className='text-2xl font-bold text-slate-800 dark:text-white uppercase tracking-wider'>
        {children}
      </div>
    )}
  </div>
));

export default DecoratedSectionTitle;
