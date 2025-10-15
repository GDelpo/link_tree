import React from 'react';
import ProgramsSection from '@components/data/ProgramsSection';
import PageHeader from '@components/layout/PageHeader';
import PageContainer from '@components/layout/PageContainer';
import PersonalizedPlanCTA from '@components/data/PersonalizedPlanCTA';
import SectionTitle from '@components/ui/SectionTitle';
import { LayoutGrid} from 'lucide-react';
import {programsSectionData, personalizedPlanCtaData, personalizedPlanLink} from '@content';

/**
 * Página dedicada a mostrar los Programas.
 * Reutiliza el componente ProgramsSection para una presentación clara y organizada.
 */
const Programs = () => {
  return (
    <>
      <PageHeader subtitle="Entrena a tu manera" title="Programas" />
      <PageContainer>
        {/* --- SECCIÓN DE PROGRAMAS --- */}
        <div id="programas">
          <SectionTitle icon={LayoutGrid}>{'Programas de Entrenamiento'}</SectionTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2 mb-2 px-4 sm:px-0">Explorá mis programas diseñados científicamente para ayudarte a alcanzar tus metas, sea cual sea tu nivel.</p>
          <ProgramsSection programs={programsSectionData.content} />
        </div>
        {/* --- CTA PERSONALIZADO --- */}
        <PersonalizedPlanCTA ctaData={personalizedPlanCtaData} contactLink={personalizedPlanLink} className="mt-8" />
      </PageContainer>
    </>
  );
};

export default Programs;