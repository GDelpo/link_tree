import React from 'react';
import PageSection from '@/components/PageSection';
import AnimatedSection from '@/components/AnimatedSection'; // Importamos el nuevo componente
import UserProfileHeader from '@/components/UserProfileHeader';
import {
  profileData,
} from '@/data';
import { pageSectionsConfig } from '@/config';
import SectionRenderer from '@/components/SectionRenderer';

/**
 * Página principal de "Links", que actúa como un agregador de contenido.
 * Muestra el perfil, programas, redes sociales y preguntas frecuentes.
 */
function Links() {
  return (
    <div>
      <PageSection id="header">
        <AnimatedSection>
          <UserProfileHeader profileData={profileData}/>
        </AnimatedSection>
      </PageSection>

      {/* Renderizamos las secciones dinámicamente a partir de la configuración */}
      {pageSectionsConfig.map(section => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}

export default Links;