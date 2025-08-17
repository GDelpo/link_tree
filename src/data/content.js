import {
  Instagram,
  Youtube,
  Mail,
  MessageSquare,
  LayoutGrid,
} from 'lucide-react';

// 1. Datos del Perfil
export const profileData = {
  name: 'Juan Cruz Arbelais',
  typewriterTitles: [
    'Profesor.',
    'Licenciado en Ed. Física.',
    'Deportista de nacimiento.',
    'Ex deportista.',
  ],
  description:
    'Licenciado en Educación Física y ex deportista con más de 10 años de experiencia. Mi método combina la ciencia del entrenamiento y la vivencia personal para desarrollar el máximo potencial de cada atleta. Mi objetivo es transformar la dedicación en resultados.',
  profileImage:
    'https://ugc.production.linktr.ee/4e61f56b-abb1-449a-9d43-e418532e4b62_1.jpeg?io=true&size=avatar-v3_0',
  socials: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/juancruzarbelais/',
      Icon: Instagram,
      hoverClass: 'hover:bg-[#E4405F]',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UCPpeMgINdTVtAKohlFAVHsg',
      Icon: Youtube,
      hoverClass: 'hover:bg-[#FF0000]',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/5491123982555',
      Icon: MessageSquare,
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

// 2. Programas de Entrenamiento
export const trainingPrograms = [
  {
    id: 'prog1',
    title: 'BIGGER & ATHLETIC',
    description:
      'DESARROLLAR MASA MUSCULAR MANTENIENDOSE ATLÉTICO',
    duration: '9 / 12 SEMANAS',
    link: 'https://api.whatsapp.com/send?phone=541123982555&text=Hola!%20Quiero%20informaci%C3%B3n%20del%20programa%20BIGGER%20&%20ATHLETIC',
  },
  {
    id: 'prog2',
    title: 'SPEED LAB',
    description:
      'ACELERACIÓN, VELOCIDAD MAXIMA, CAMBIO DE DIRECCIÓN',
    duration: '6 / 9 SEMANAS',
    link: 'https://api.whatsapp.com/send?phone=541123982555&text=Hola!%20Quiero%20informaci%C3%B3n%20del%20programa%20SPEED%20LAB',
  },
  {
    id: 'prog3',
    title: 'STRENGHT & POWER IN SEASON',
    description:
      'FUERZA - POTENCIA - HIPERTROFIA | En temporada',
    duration: '8 / 12 SEMANAS',
    link: 'https://api.whatsapp.com/send?phone=541123982555&text=Hola!%20Quiero%20informaci%C3%B3n%20del%20programa%20STRENGHT%20&%20POWER%20IN%20SEASON',
  },
  {
    id: 'prog4',
    title: 'BEGINNER',
    description:
      'Construir una base solida en el entrenamiento de la fuerza',
    duration: '8 / 12 SEMANAS',
    link: 'https://api.whatsapp.com/send?phone=541123982555&text=Hola!%20Quiero%20informaci%C3%B3n%20del%20programa%20BEGINNER',
  },
  
];

// 3. Contenido del Acordeón (solo datos, sin JSX)
export const accordionItemsData = [
  {
    id: 1,
    title: 'Programas de Entrenamiento',
    icon: LayoutGrid,
    description:
      'Explorá mis programas diseñados científicamente para ayudarte a alcanzar tus metas, sea cual sea tu nivel.',
    // Hacemos referencia a los programas para que App.jsx los renderice
    content: trainingPrograms,
  },
];

// 4. Posts de Instagram
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

// 5. Videos de YouTube
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