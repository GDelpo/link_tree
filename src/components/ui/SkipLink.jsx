import React from 'react';

/**
 * Componente Skip Link para permitir que usuarios de teclado salten al contenido principal
 */
const SkipLink = ({
  targetId = 'main-content',
  children = 'Saltar al contenido principal',
}) => {
  return (
    <a
      href={`#${targetId}`}
      className='
        sr-only focus:not-sr-only 
        fixed top-4 left-4 z-[999] 
        bg-sky-700 text-white 
        px-4 py-2 rounded-md 
        font-medium text-sm
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-700
        transition-all duration-200
        hover:bg-sky-800
      '
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      {children}
    </a>
  );
};

export default SkipLink;
