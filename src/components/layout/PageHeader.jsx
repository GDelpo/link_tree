import React from 'react';

/**
 * Componente para renderizar un encabezado de página estandarizado.
 * @param {{
 *   subtitle: string,
 *   title: string,
 *   className?: string
 * }} props
 */
const PageHeader = ({ subtitle, title, className = 'text-center mb-12' }) => {
  return (
    <div className={className}>
      <p className="text-sm uppercase text-slate-500 dark:text-slate-400">{subtitle}</p>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">{title}</h2>
    </div>
  );
};

export default PageHeader;