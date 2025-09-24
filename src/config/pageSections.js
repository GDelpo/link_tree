import { LayoutGrid, MessageCircle, HelpCircle } from 'lucide-react';
import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import { programsSectionData } from '@/data';

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
    contentCardClassName: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg ring-1 ring-slate-900/5 overflow-hidden transition-colors duration-300',
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
    icon: SiInstagram,
    className: 'w-full overflow-x-hidden',
    contentCardClassName: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg ring-1 ring-slate-900/5 overflow-hidden transition-colors duration-300',
  },
  {
    id: 'youtube',
    type: 'youtube',
    navText: 'YouTube',
    title: 'Últimos Videos en YouTube',
    icon: SiYoutube,
    className: 'w-full overflow-x-hidden',
    contentCardClassName: 'mt-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg ring-1 ring-slate-900/5 overflow-hidden transition-colors duration-300',
  },
  {
    id: 'faq',
    type: 'faq',
    navText: 'Preguntas',
    title: 'Preguntas Frecuentes',
    icon: HelpCircle,
    contentCardClassName: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg ring-1 ring-slate-900/5 overflow-hidden transition-colors duration-300',
  },
];

/**
 * Transforma la configuración de secciones en una lista de enlaces para la Navbar.
 * Esto evita que la lógica de transformación esté dentro del componente Links.jsx.
 */
export const linksNavItems = pageSectionsConfig.map(({ id, navText, icon }) => ({ id, text: navText, icon }));
