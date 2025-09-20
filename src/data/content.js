import {
  Mail,
  LayoutGrid,
} from 'lucide-react';
import { SiInstagram, SiYoutube, SiWhatsapp } from '@icons-pack/react-simple-icons';

/**
 * =================================================================
 * CONFIGURACIÓN DE CONTACTO
 * =================================================================
 */
const WHATSAPP_PHONE = '541123982555';
const WHATSAPP_MESSAGE_PREFIX = 'Hola! Quiero información del programa';
const generateWhatsAppLink = (programName) => `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(`${WHATSAPP_MESSAGE_PREFIX} ${programName}`)}`;
export const personalizedPlanLink = generateWhatsAppLink('Personalizado');

/**
 * =================================================================
 * DATOS DEL PERFIL Y REDES SOCIALES
 * =================================================================
 */
export const profileData = {
  name: 'Juan Cruz Arbelais',
  titles: [
    'Profesor de Educación Física.',
    'Licenciado en Ed. Física.',
    'Ex deportista.',
  ],
  description:
    'Preparador físico con 10+ años de experiencia. Ex deportista. Pasé de atleta a preparador, ahora uso la ciencia junto a mi experiencia para ayudarte a progresar.',
  profileImage:
    'https://ugc.production.linktr.ee/4e61f56b-abb1-449a-9d43-e418532e4b62_1.jpeg?io=true&size=avatar-v3_0',
  profileImageAlt: 'Foto de perfil de Juan Cruz Arbelais',
  socials: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/juancruzarbelais/',
      Icon: SiInstagram,
      hoverClass: 'hover:bg-[#E4405F]',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UCPpeMgINdTVtAKohlFAVHsg',
      Icon: SiYoutube,
      hoverClass: 'hover:bg-[#FF0000]',
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/${WHATSAPP_PHONE}`,
      Icon: SiWhatsapp,
      hoverClass: 'hover:bg-[#25D366]',
    },
    {
      name: 'Mail',
      url: 'mailto:juancruzarbelais@gmail.com',
      Icon: Mail,
      hoverClass: 'hover:bg-slate-600',
    },
  ],
};

/**
 * =================================================================
 * DATOS DE PROGRAMAS DE ENTRENAMIENTO
 * =================================================================
 */
export const accordionItemsData = [
  {
    id: 1,
    title: 'Programas de Entrenamiento',
    icon: LayoutGrid,
    description:
      'Explorá mis programas diseñados científicamente para ayudarte a alcanzar tus metas, sea cual sea tu nivel.',
    content: [
      {
        id: 'prog1',
        title: 'REBUILD PROGRAM',
        description:
          'MEJORÁ TUS BÁSICOS, DESARROLLÁ MASA MUSCULAR Y MANTENETE ATLÉTICO',
        duration: '12 SEMANAS',
      },
      {
        id: 'prog2',
        title: 'BIGGER & ATHLETIC',
        description:
          'DESARROLLAR MASA MUSCULAR MANTENIENDOSE ATLÉTICO',
        duration: '9 / 12 SEMANAS',
      },
      {
        id: 'prog3',
        title: 'SPEED LAB',
        description:
          'ACELERACIÓN, VELOCIDAD MAXIMA, CAMBIO DE DIRECCIÓN',
        duration: '6 / 9 SEMANAS',
      },
      {
        id: 'prog4',
        title: 'STRENGHT & POWER IN SEASON',
        description:
          'FUERZA - POTENCIA - HIPERTROFIA | EN TEMPORADA',
        duration: '8 / 12 SEMANAS',
      },
      {
        id: 'prog5',
        title: 'BEGINNER',
        description:
          'CONSTRUIR UNA BASE SÓLIDA DE FUERZA',
        duration: '8 SEMANAS',
      }
    ].map(program => ({
      ...program,
      link: generateWhatsAppLink(program.title)
    })),
  },
];

/**
 * =================================================================
 * DATOS DE MUESTRA PARA POSTS DE INSTAGRAM
 * =================================================================
 */
export const instagramPosts = [
  {
    id: 'inst1',
    imageUrl:
      'https://images.unsplash.com/photo-1581009137052-c40971b43bf3?q=80&w=800',
    caption: 'Post 1',
    link: '#',
  },
  {
    id: 'inst2',
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
    caption: 'Post 2',
    link: '#',
  },
  {
    id: 'inst3',
    imageUrl:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800',
    caption: 'Post 3',
    link: '#',
  },
];

/**
 * =================================================================
 * DATOS DE MUESTRA PARA VIDEOS DE YOUTUBE
 * =================================================================
 */
export const youTubeVideos = [
  {
    id: 'yt1',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    title: 'Rutina completa de tren superior',
    link: '#',
  },
  {
    id: 'yt2',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
    title: 'Cómo mejorar tu sentadilla',
    link: '#',
  },
  {
    id: 'yt3',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800',
    title: 'Cardio HIIT para quemar grasa',
    link: '#',
  },
];