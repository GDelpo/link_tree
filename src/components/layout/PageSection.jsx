import React, { memo } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Componente contenedor que envuelve un bloque de contenido en una etiqueta <section>,
 * aplicando padding vertical y un ID para la navegación.
 * Incluye una animación de aparición gradual cuando el usuario hace scroll hasta él.
 * @param {{ id: string, className?: string, children: React.ReactNode }} props
 */
const PageSection = memo(({ id, className = '', children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // La animación solo se dispara una vez
    threshold: 0.1,    // Se activa cuando el 10% del componente es visible
  });

  return (
    <section
      ref={ref}
      id={id}
      // Aplicamos clases de transición y cambiamos la opacidad y posición
      // basándonos en si el componente está a la vista (inView).
      className={`py-6 transition-all duration-1000 ease-in-out ${className} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </section>
  );
});

export default PageSection;