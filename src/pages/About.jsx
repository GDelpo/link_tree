import React from 'react';
import { Download } from 'lucide-react';

// Importamos solo los datos que vamos a usar
import { profileData } from '../data/content';
import { 
  personalInfo, 
  education,
  experience
} from '../data/aboutData';
import TimelineItem from '../components/TimelineItem';

// Componente helper para títulos de sección
const SectionTitle = ({ children }) => (
  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-wider relative pl-4
                 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-full after:bg-sky-500">
    {children}
  </h3>
);

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* --- SECCIÓN PRINCIPAL --- */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase text-slate-500 dark:text-slate-400">Biografía</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">Sobre Mí</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2">
          <img 
            src={profileData.profileImage} 
            alt={profileData.name} 
            className="rounded-lg w-full h-auto object-cover shadow-lg"
          />
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{profileData.name}</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">{profileData.description}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
            {personalInfo.map(item => (
              <li key={item.label}>
                <span className="font-bold text-slate-800 dark:text-white">{item.label}:</span>
                <span className="text-slate-600 dark:text-slate-400 ml-2">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- SECCIÓN DE EDUCACIÓN Y EXPERIENCIA --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SectionTitle>Educación</SectionTitle>
          <div>{education.map(item => <TimelineItem key={item.title} {...item} />)}</div>
        </div>
        <div>
          <SectionTitle>Experiencia</SectionTitle>
          <div>{experience.map(item => <TimelineItem key={item.title} {...item} />)}</div>
        </div>
      </div>
    </div>
  );
};

export default About;