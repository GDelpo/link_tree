import React, { useState, useEffect } from 'react';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';
import { WHATSAPP_PHONE } from '@content/contact';
import FloatingActionButton from '@components/ui/FloatingActionButton';
import { EMERALD_GRADIENT_CLASSES } from '@/utils/constants';

const WhatsAppButton = ({ isPushedUp }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Sigue apareciendo a los 2 segundos
    return () => clearTimeout(timer);
  }, []);
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}`;
  const positionClass = isPushedUp ? 'bottom-24' : 'bottom-8';

  return (
    <FloatingActionButton
      isVisible={isVisible}
      href={whatsappUrl}
      icon={SiWhatsapp}
      gradientColors={EMERALD_GRADIENT_CLASSES}
      ariaLabel="Contactar por WhatsApp"
      position={positionClass}
      focusRingColor="focus:ring-green-500"
      description="Abrir conversación de WhatsApp en una nueva pestaña"
    />
  );
};

export default WhatsAppButton;