import React from 'react';

// Importamos solo los datos que vamos a usar
import { profileData,personalInfo, 
  education,
  experience } from '@/data';

import PageHeader from '@/components/PageHeader';
import PageContainer from '@/components/PageContainer';
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
    <>
      <PageHeader subtitle="Biografía" title="Sobre Mí" />
      <PageContainer>
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
            {Object.entries(personalInfo).map(([key, value]) => (
              <li key={key}>
                <span className="font-bold text-slate-800 dark:text-white">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>
                <span className="text-slate-600 dark:text-slate-400 ml-2">
                  {value}
                </span>
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
      </PageContainer>
    </>
  );
};

export default About;