import React, { useState, useEffect } from 'react';
import FloatingActionButton from '@components/ui/FloatingActionButton';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';
import { ArrowUp } from 'lucide-react';
import {
  EMERALD_GRADIENT_CLASSES,
  SKY_GRADIENT_CLASSES,
} from '@/utils/constants';
import { WHATSAPP_PHONE } from '@content/contact';

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

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}`;
  const positionClass = isScrollButtonVisible ? 'bottom-24' : 'bottom-8';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp */}
      <FloatingActionButton
        isVisible={true}
        href={whatsappUrl}
        icon={SiWhatsapp}
        gradientColors={EMERALD_GRADIENT_CLASSES}
        ariaLabel='Contactar por WhatsApp'
        position={positionClass}
        focusRingColor='focus:ring-green-500'
        description='Abrir conversación de WhatsApp en una nueva pestaña'
      />

      {/* Scroll to top */}
      <FloatingActionButton
        isVisible={isScrollButtonVisible}
        onClick={scrollToTop}
        icon={ArrowUp}
        gradientColors={SKY_GRADIENT_CLASSES}
        ariaLabel='Volver al inicio de la página'
        focusRingColor='focus:ring-sky-500'
        description='Hacer clic para desplazarse al inicio de la página'
      />
    </>
  );
};

export default FloatingButtons;
