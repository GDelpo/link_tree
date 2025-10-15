import React from 'react';
import PageSection from '@components/layout/PageSection';
import AnimatedSection from '@components/ui/AnimatedSection';
import UserProfileHeader from '@components/data/UserProfileHeader';
import {
  profileData,
} from '@content';
import { pageSectionsConfig } from '@config';
import SectionRenderer from '@components/SectionRenderer';

/**
 * Página principal de "Links", que actúa como un agregador de contenido.
 * Muestra el perfil, programas, redes sociales y preguntas frecuentes.
 */
function Links() {
  return (
    <div>
      {/* Cabecera principal del perfil */}
      <header>
        <PageSection id="header">
          <AnimatedSection>
            <UserProfileHeader profileData={profileData}/>
          </AnimatedSection>
        </PageSection>
      </header>

      {/* Contenido principal con secciones dinámicas */}
      <main>
        {pageSectionsConfig.map(section => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}

export default Links;