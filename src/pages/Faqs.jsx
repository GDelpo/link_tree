import React from 'react';
import { faqData } from '@content';
import Accordion from '@components/data/Accordion';
import PageHeader from '@components/layout/PageHeader';
import PageContainer from '@components/layout/PageContainer';
import SectionTitle from '@components/ui/SectionTitle';
import { HelpCircle } from 'lucide-react';

/** Pre-procesa los datos de las FAQ para dar estilo al texto del contenido desplegable. */
const faqAccordionItems = faqData.map((item) => ({
  ...item,
  collapsibleContent: (
    <p className='text-slate-600 dark:text-slate-400 leading-relaxed pt-2 pb-4 px-1'>
      {item.collapsibleContent}
    </p>
  ),
}));

/**
 * Página dedicada a mostrar las Preguntas Frecuentes (FAQ).
 * Reutiliza el componente Accordion para una presentación clara y organizada.
 */
const Faqs = () => {
  return (
    <>
      <PageHeader subtitle='Resolvé tus dudas' title='Preguntas Frecuentes' />
      <PageContainer>
        {/* --- SECCIÓN DE FAQ --- */}
        <div id='faqs'>
          <SectionTitle icon={HelpCircle}>
            {'Preguntas Frecuentes'}
          </SectionTitle>
          <p className='text-sm text-slate-500 dark:text-slate-400 -mt-2 mb-2 px-4 sm:px-0'>
            Encontrá respuestas a las dudas más comunes sobre mis servicios y
            metodología.
          </p>
          <Accordion items={faqAccordionItems} />
        </div>
      </PageContainer>
    </>
  );
};

export default Faqs;
