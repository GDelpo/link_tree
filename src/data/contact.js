import { personalInfo } from './personalData.js';
import { MessageCircle } from 'lucide-react';

// Find the phone number from personalInfo, remove spaces and the '+' sign
const phoneObject = personalInfo.find(item => item.label === 'Teléfono');
export const WHATSAPP_PHONE = phoneObject.value.replace(/\s/g, '').replace('+', '');

const WHATSAPP_MESSAGE_PREFIX = 'Hola! Quiero información del programa';

export const generateWhatsAppLink = (programName) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    `${WHATSAPP_MESSAGE_PREFIX} ${programName}`
  )}`;

export const personalizedPlanLink = generateWhatsAppLink('personalizado');

export const personalizedPlanCtaData = {
  icon: MessageCircle,
  title: "¿Buscás algo más?",
  description:
    "Si ninguno de estos programas se ajusta a tus objetivos o querés llevar tu entrenamiento al siguiente nivel, creemos juntos un plan 100% personalizado para vos.",
  buttonText: "¡Hablemos!",
};