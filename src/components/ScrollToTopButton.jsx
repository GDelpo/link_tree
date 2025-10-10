import React from 'react';
import { ArrowUp } from 'lucide-react';
import FloatingActionButton from './FloatingActionButton';
import { SKY_GRADIENT_CLASSES } from '@/utils/constants';

const ScrollToTopButton = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FloatingActionButton
      isVisible={isVisible}
      onClick={scrollToTop}
      icon={ArrowUp}
      gradientColors={SKY_GRADIENT_CLASSES}
      ariaLabel="Volver al inicio de la página"
      focusRingColor="focus:ring-sky-500"
      description="Hacer clic para desplazarse al inicio de la página"
    />
  );
};

export default ScrollToTopButton;