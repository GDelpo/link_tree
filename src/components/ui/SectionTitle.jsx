import React, { memo } from 'react';

/**
 * Componente para renderizar un título de sección estandarizado con un ícono.
 * @param {{ icon: React.ElementType, children: React.ReactNode }} props
 */
const SectionTitle = memo(({ icon: Icon, children }) => (
  <h2 className='text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3'>
    <Icon className='text-sky-500 dark:text-sky-400' size={28} />
    {children}
  </h2>
));

export default SectionTitle;
