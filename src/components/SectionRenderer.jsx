import React from 'react';
import { HelpCircle } from 'lucide-react';

import PageSection from '@components/PageSection';
import AnimatedSection from '@components/AnimatedSection';
import ContentCard from '@components/ContentCard';
import SectionTitle from '@components/SectionTitle';
import ProgramsSection from '@components/ProgramsSection';
import PersonalizedPlanCTA from '@components/PersonalizedPlanCTA';
import CardGrid from '@components/CardGrid';
import MediaCard from '@components/MediaCard';
import Accordion from '@components/Accordion';
import InstagramSection from '@components/InstagramSection';

import {
  programsSectionData,
  personalizedPlanCtaData,
  personalizedPlanLink,
  youTubeVideos,
  faqData,
} from '@content';

/**
 * Componente para renderizar una sección completa de la página de Links.
 * Abstrae la lógica de qué componente renderizar para cada tipo de sección.
 * @param {{ section: object }} props
 */
const SectionRenderer = ({ section }) => {
  const { id, type, title, icon, description, className, contentCardClassName } = section;

  const renderContent = () => {
    switch (type) {
      case 'programs':
        return <ProgramsSection programs={programsSectionData.content} />;
      case 'contact':
        return <PersonalizedPlanCTA ctaData={personalizedPlanCtaData} contactLink={personalizedPlanLink} />;
      case 'instagram':
        return <InstagramSection limit={3} />;
      case 'youtube':
        return <CardGrid items={youTubeVideos} renderItem={(video) => <MediaCard item={video} type="youtube" />} />;
      case 'faq':
        return <Accordion items={faqData} />;
      default:
        return null;
    }
  };

  // El CTA de contacto no necesita el envoltorio de `ContentCard`.
  if (type === 'contact') {
    return (
      <PageSection id={id} className={className}>
        <AnimatedSection>
          {renderContent()}
        </AnimatedSection>
      </PageSection>
    );
  }

  return (
    <PageSection id={id} className={className}>
      <AnimatedSection>
        <ContentCard className={contentCardClassName}>
          <SectionTitle icon={icon}>{title}</SectionTitle>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2 mb-2 px-4 sm:px-0">{description}</p>
          )}
          {renderContent()}
        </ContentCard>
      </AnimatedSection>
    </PageSection>
  );
};

export default SectionRenderer;