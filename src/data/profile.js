import { personalInfo } from './personalData.js';
import { Mail } from 'lucide-react';
import { SiInstagram, SiYoutube, SiWhatsapp } from '@icons-pack/react-simple-icons';
import { personalizedPlanLink } from './contact';

const emailObject = personalInfo.find(item => item.label === 'Email');
const emailLink = `mailto:${emailObject.value}`;

export const profileData = {
  name: 'Juan Cruz Arbelais',
  titles: [
    'Profesor de Educación Física.',
    'Licenciado en Ed. Física.',
    'Ex deportista.',
  ],
  description:
    'Preparador físico con más de 10 años de experiencia. Ex deportista. Pasé de atleta a preparador, ahora uso la ciencia junto a mi experiencia para ayudarte a progresar.',  
  profileImage:
    'https://ugc.production.linktr.ee/4e61f56b-abb1-449a-9d43-e418532e4b62_1.jpeg?io=true&size=avatar-v3_0',
  profileImageAlt: 'Foto de perfil de Juan Cruz Arbelais',
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/juancruzarbelais/', Icon: SiInstagram, hoverClass: 'hover:bg-[#E4405F]' },
    { name: 'YouTube', url: 'https://www.youtube.com/channel/UCPpeMgINdTVtAKohlFAVHsg', Icon: SiYoutube, hoverClass: 'hover:bg-[#FF0000]' },
    { name: 'WhatsApp', url: personalizedPlanLink, Icon: SiWhatsapp, hoverClass: 'hover:bg-[#25D366]' },
    { name: 'Mail', url: emailLink, Icon: Mail, hoverClass: 'hover:bg-blue-700' },
  ],
};