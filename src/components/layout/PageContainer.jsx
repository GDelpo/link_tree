import React from 'react';
import AnimatedSection from '@components/ui/AnimatedSection';

/**
 * Contenedor principal para el contenido de las páginas estáticas.
 * Proporciona un layout centrado, animación y un estilo de tarjeta consistente.
 * Reutiliza AnimatedSection para la animación de entrada.
 * @param {{ children: React.ReactNode }} props
 */
const PageContainer = ({ children }) => {
  return (
    <AnimatedSection className='max-w-4xl mx-auto'>
      <div className='bg-white/60 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-sky-950/20 backdrop-blur-lg ring-1 ring-slate-900/5 transition-colors duration-300'>
        {children}
      </div>
    </AnimatedSection>
  );
};

export default PageContainer;
