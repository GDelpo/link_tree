import { LayoutGrid, MessageCircle, HelpCircle } from 'lucide-react';
import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import { programsSectionData } from '@content';
import { GLASS_CARD_CLASSES } from '@/utils/constants';

/**
 * Configuración centralizada para las secciones de la página de "Links".
 * Cada objeto define una sección, su contenido y cómo se muestra.
 */
export const pageSectionsConfig = [
  {
    id: 'programas',
    type: 'programs',
    navText: 'Programas',
    title: programsSectionData.title,
    description: programsSectionData.description,
    icon: LayoutGrid,
    contentCardClassName: GLASS_CARD_CLASSES,
  },
  {
    id: 'contacto',
    type: 'contact',
    navText: 'Contacto',
    icon: MessageCircle,
    // Esta sección no usa ContentCard, por lo que no necesita título ni descripción aquí.
  },
  {
    id: 'instagram',
    type: 'instagram',
    navText: 'Instagram',
    title: 'Últimos Posts en Instagram',
    description:
      'Explorá mis publicaciones recientes en Instagram. Para ver más contenido, visitá mi perfil.',
    icon: SiInstagram,
    className: 'w-full overflow-x-hidden',
    contentCardClassName: GLASS_CARD_CLASSES,
  },
  // {
  //   id: 'youtube',
  //   type: 'youtube',
  //   navText: 'YouTube',
  //   title: 'Últimos Videos en YouTube',
  //   icon: SiYoutube,
  //   className: 'w-full overflow-x-hidden',
  //   contentCardClassName: `mt-6 ${GLASS_CARD_CLASSES}`,
  // },
  {
    id: 'faq',
    type: 'faq',
    navText: 'Preguntas',
    title: 'Preguntas Frecuentes',
    icon: HelpCircle,
    contentCardClassName: GLASS_CARD_CLASSES,
  },
];

/**
 * Transforma la configuración de secciones en una lista de enlaces para la Navbar.
 * Esto evita que la lógica de transformación esté dentro del componente Links.jsx.
 */
export const linksNavItems = pageSectionsConfig.map(
  ({ id, navText, icon }) => ({ id, text: navText, icon })
);
