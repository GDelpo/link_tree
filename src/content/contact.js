import { personalInfo } from './personalData.js';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/utils/linkUtils.js';

// Find the phone number from personalInfo, remove spaces and the '+' sign
export const WHATSAPP_PHONE = personalInfo.telefono.replace(/\s/g, '').replace('+', '');

const WHATSAPP_MESSAGE_PREFIX = 'Hola! Quiero información del programa';

export const generateWhatsAppLink = (programName) =>
  buildWhatsAppLink(WHATSAPP_PHONE, `${WHATSAPP_MESSAGE_PREFIX} ${programName}`);

export const personalizedPlanLink = generateWhatsAppLink('personalizado');

export const personalizedPlanCtaData = {
  icon: MessageCircle,
  title: "¿Buscás algo más?",
  description:
    "Si ninguno de estos programas se ajusta a tus objetivos o querés llevar tu entrenamiento al siguiente nivel, creemos juntos un plan 100% personalizado para vos.",
  buttonText: "¡Hablemos!",
};