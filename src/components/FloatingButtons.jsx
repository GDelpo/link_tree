// components/FloatingButtons.jsx

import React, { useState, useEffect } from 'react';
import WhatsAppButton from './WhatsAppButton';
import ScrollToTopButton from './ScrollToTopButton';

const FloatingButtons = () => {
  // Este estado ahora vive en el componente padre.
  // Controla la visibilidad del botón de "Scroll to Top".
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Si el usuario scrollea más de 300px, mostramos el botón.
      if (window.scrollY > 300) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };

    // Agregamos y limpiamos el listener del scroll.
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {/* Le pasamos una prop al WhatsAppButton para que sepa si tiene que "subir".
        También le pasamos el estado de visibilidad del botón de scroll.
      */}
      <WhatsAppButton isPushedUp={isScrollButtonVisible} />
      <ScrollToTopButton isVisible={isScrollButtonVisible} />
    </>
  );
};

export default FloatingButtons;