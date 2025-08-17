import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import Accordion from './components/Accordion';
import ProgramCard from './components/ProgramCard';
import InstagramCard from './components/InstagramCard';
import YouTubeCard from './components/YouTubeCard';
import ThemeToggle from './components/ThemeToggle';
import PersonalizedPlanCTA from './components/PersonalizedPlanCTA';
import { Instagram, Youtube, ArrowRight } from 'lucide-react';
import {
  accordionItemsData,
  instagramPosts,
  youTubeVideos,
} from './data/content';

const SectionTitle = ({ icon: Icon, children }) => (
  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
    <Icon className="text-sky-500 dark:text-sky-400" size={28} />
    {children}
  </h2>
);

function App() {
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
    <div className="bg-white dark:bg-slate-900 min-h-screen w-full flex items-start justify-center p-4 sm:p-8 md:p-12 font-sans transition-colors duration-300">
      {/* Fondo con gradiente */}
      <div className="fixed inset-0 z-0 bg-slate-50 dark:bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:to-slate-950"></div>

      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl">
        <ProfileHeader />
        <Accordion items={accordionItems} />
        <PersonalizedPlanCTA contactLink={'https://api.whatsapp.com/send?phone=541123982555&text=Hola!%20Quiero%20informaci%C3%B3n%20del%20programa%20Personalizado'} />
        {/* <div className="w-full flex flex-col gap-6">
          <section className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6">
            <SectionTitle icon={Instagram}>Últimos Posts en Instagram</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {instagramPosts.map((post) => (
                <InstagramCard key={post.id} post={post} />
              ))}
            </div>
            <div className="flex justify-center sm:justify-end">
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors">
                Ver más en Instagram
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>
          <section className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6">
            <SectionTitle icon={Youtube}>Últimos Videos en YouTube</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {youTubeVideos.map((video) => (
                <YouTubeCard key={video.id} video={video} />
              ))}
            </div>
            <div className="flex justify-center sm:justify-end">
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors">
                Ver más en YouTube
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        </div> */}
      </div>
    </div>
  );
}

export default App;