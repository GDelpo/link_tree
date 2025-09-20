import React, { useEffect } from 'react';
import { useLayoutContext } from '@/contexts/LayoutContext.jsx';

// Importaciones de todos tus componentes y datos
import Accordion from '@/components/Accordion';
import InstagramCard from '@/components/InstagramCard';
import YouTubeCard from '@/components/YouTubeCard';
import PersonalizedPlanCTA from '@/components/PersonalizedPlanCTA';
import ProgramCard from '@/components/ProgramCard';
import SectionTitle from '@/components/SectionTitle';
import PageSection from '@/components/PageSection';
import ContentCard from '@/components/ContentCard';
import CardGrid from '@/components/CardGrid';
import { HelpCircle } from 'lucide-react';
import UserProfileHeader from '@/components/UserProfileHeader';
import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import {
  profileData,
  accordionItemsData,
  instagramPosts,
  youTubeVideos,
  personalizedPlanLink,
  faqData,
} from '@/data';

/**
 * Define las secciones de la página que se usarán para generar los enlaces de navegación
 * en la barra superior.
 */
const pageSections = [
  { id: 'programas', text: 'PROGRAMAS' },
  { id: 'contacto', text: 'CONTACTO' },
  { id: 'redes', text: 'REDES' },
  { id: 'faq', text: 'PREGUNTAS' },
];

/** Pre-procesa los datos de los programas para inyectar el componente ProgramCard en el acordeón. */
const accordionItems = accordionItemsData.map((item) => ({
  ...item,
  collapsibleContent: (
    <div className="flex flex-col gap-4">
      {item.content.map((program) => (
        <ProgramCard
          key={program.id}
          title={program.title}
          description={program.description}
          duration={program.duration}
          link={program.link}
        />
      ))}
    </div>
  ),
}));

/** Pre-procesa los datos de las FAQ para dar estilo al texto del contenido desplegable. */
const faqAccordionItems = faqData.map((item) => ({
  ...item,
  collapsibleContent: (
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.collapsibleContent}</p>
  )
}));

/**
 * Página principal de "Links", que actúa como un agregador de contenido.
 * Muestra el perfil, programas, redes sociales y preguntas frecuentes.
 */
function Links() {
  // Consume el contexto para obtener la función `setNavLinks` directamente, sin prop drilling.
  const { setNavLinks } = useLayoutContext();

  // Efecto para establecer y limpiar los enlaces de navegación de esta página.
  useEffect(() => {
    if (setNavLinks) {
      setNavLinks(pageSections);
    }
    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    return () => {
      if (setNavLinks) {
        setNavLinks([]);
      }
    };
  }, [setNavLinks]);

  return (
    <div>
      <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:to-slate-950"></div>

      <PageSection id="header">
        <UserProfileHeader profileData={profileData}/>
      </PageSection>

      <PageSection id="programas">
        <Accordion items={accordionItems} />
      </PageSection>

      <PageSection id="contacto">
        <PersonalizedPlanCTA contactLink={personalizedPlanLink} />
      </PageSection>

      <PageSection id="redes" className="w-full flex flex-col gap-6">
        <ContentCard>
          <SectionTitle icon={SiInstagram}>Últimos Posts en Instagram</SectionTitle>
          <CardGrid
            items={instagramPosts}
            renderItem={(post) => <InstagramCard post={post} />}
          />
        </ContentCard>
        <ContentCard>
          <SectionTitle icon={SiYoutube}>Últimos Videos en YouTube</SectionTitle>
          <CardGrid
            items={youTubeVideos}
            renderItem={(video) => <YouTubeCard video={video} />}
          />
        </ContentCard>
      </PageSection>

      <PageSection id="faq">
        <ContentCard>
          <SectionTitle icon={HelpCircle}>Preguntas Frecuentes</SectionTitle>
          <Accordion items={faqAccordionItems} />
        </ContentCard>
      </PageSection>
    </div>
  );
}

export default Links;