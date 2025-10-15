import React from 'react';

// Importamos solo los datos que vamos a usar
import { profileData,personalInfo, 
  education,
  experience } from '@content';

import PageHeader from '@components/layout/PageHeader';
import PageContainer from '@components/layout/PageContainer';
import TimelineItem from '@components/ui/TimelineItem';
import DecoratedSectionTitle from '@components/layout/DecoratedSectionTitle';

const About = () => {
  return (
    <>
      <PageHeader subtitle="Biografía" title="Sobre Mí" />
      <PageContainer>
        {/* Sección principal del perfil */}
        <section aria-labelledby="profile-heading" className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <img 
              src={profileData.profileImage} 
              alt={`Foto de perfil de ${profileData.name}`}
              className="rounded-lg w-full h-auto object-cover shadow-lg"
            />
          </div>
          <div className="lg:col-span-3">
            <h2 id="profile-heading" className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{profileData.name}</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">{profileData.description}</p>
            
            {/* Información personal */}
            <section aria-labelledby="personal-info-heading">
              <h3 id="personal-info-heading" className="sr-only">Información Personal</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                {Object.entries(personalInfo).map(([key, value]) => (
                  <div key={key}>
                    <dt className="font-bold text-slate-800 dark:text-white">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </dt>
                    <dd className="text-slate-600 dark:text-slate-400 ml-2">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </section>

        {/* Secciones de Educación y Experiencia */}
        <section aria-labelledby="background-heading" className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <h2 id="background-heading" className="sr-only">Formación y Experiencia Profesional</h2>
          
          {/* Educación */}
          <section aria-labelledby="education-heading">
            <DecoratedSectionTitle>
              <h3 id="education-heading">Educación</h3>
            </DecoratedSectionTitle>
            <div role="list">{education.map(item => <TimelineItem key={item.title} {...item} />)}</div>
          </section>
          
          {/* Experiencia */}
          <section aria-labelledby="experience-heading">
            <DecoratedSectionTitle>
              <h3 id="experience-heading">Experiencia</h3>
            </DecoratedSectionTitle>
            <div role="list">{experience.map(item => <TimelineItem key={item.title} {...item} />)}</div>
          </section>
        </section>
      </PageContainer>
    </>
  );
};

export default About;