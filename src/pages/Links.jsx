import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// Importaciones de todos tus componentes y datos
import UserProfileHeader from '../components/UserProfileHeader';
import Accordion from '../components/Accordion';
import ProgramCard from '../components/ProgramCard';
import InstagramCard from '../components/InstagramCard';
import YouTubeCard from '../components/YouTubeCard';
import PersonalizedPlanCTA from '../components/PersonalizedPlanCTA';
import FaqSection from '../components/FaqSection';
import { Instagram, Youtube } from 'lucide-react';
import {
  profileData,
  accordionItemsData,
  instagramPosts,
  youTubeVideos,
} from '../data/content';

// 1. Definimos las secciones que tendrá la página y el texto para la Navbar.
const pageSections = [
  { id: 'programas', text: 'Programas' },
  { id: 'contacto', text: 'Contacto' },
  { id: 'redes', text: 'Redes' },
  { id: 'faq', text: 'Preguntas' },
];

// Componente helper para los títulos de sección (ya lo tenías)
const SectionTitle = ({ icon: Icon, children }) => (
  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
    <Icon className="text-sky-500 dark:text-sky-400" size={28} />
    {children}
  </h2>
);

function Links() {
  // 2. Obtenemos la función `setNavLinks` que nos provee SimpleLayout
  const { setNavLinks } = useOutletContext();

  // 3. Usamos useEffect para comunicar las secciones al layout cuando el componente se carga
  useEffect(() => {
    // Verificamos que setNavLinks exista antes de llamarlo
    if (setNavLinks) {
      setNavLinks(pageSections);
    }
    // Limpiamos los links cuando el componente se va para no afectar otras páginas
    return () => {
      if (setNavLinks) {
        setNavLinks([]);
      }
    };
  }, [setNavLinks]);

  // Tu lógica para procesar los items del accordion (sin cambios)
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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:to-slate-950"></div>

      {/* 4. Contenido envuelto en secciones con IDs */}
      <section id="header" className="py-6">
        <UserProfileHeader profileData={profileData}/>
      </section>

      <section id="programas" className="py-6">
        <Accordion items={accordionItems} />
      </section>

      <section id="contacto" className="py-6">
        <PersonalizedPlanCTA contactLink={'https://api.whatsapp.com/send?phone=541123982555&text=Hola!%20Quiero%20informaci%C3%B3n%20del%20programa%20Personalizado'} />
      </section>

      <section id="redes" className="py-6 w-full flex flex-col gap-6">
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6">
          <SectionTitle icon={Instagram}>Últimos Posts en Instagram</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {instagramPosts.map((post) => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6">
          <SectionTitle icon={Youtube}>Últimos Videos en YouTube</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {youTubeVideos.map((video) => (
              <YouTubeCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-6">
        <FaqSection />
      </section>
    </div>
  );
}

export default Links;