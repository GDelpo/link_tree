import React from 'react';
import { faqData } from '@content';
import Accordion from '@components/Accordion';
import PageHeader from '@components/PageHeader';
import PageContainer from '@components/PageContainer';

/** Pre-procesa los datos de las FAQ para dar estilo al texto del contenido desplegable. */
const faqAccordionItems = faqData.map((item) => ({
  ...item,
  collapsibleContent: (
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pt-2 pb-4 px-1">
      {item.collapsibleContent}
    </p>
  )
}));

/**
 * Página dedicada a mostrar las Preguntas Frecuentes (FAQ).
 * Reutiliza el componente Accordion para una presentación clara y organizada.
 */
const Faqs = () => {
  return (
    <>
      <PageHeader subtitle="Resolvé tus dudas" title="Preguntas Frecuentes" />
      <PageContainer>
        <section aria-labelledby="faqs-section">
          <h2 id="faqs-section" className="sr-only">Lista de Preguntas Frecuentes</h2>
          <Accordion items={faqAccordionItems} />
        </section>
      </PageContainer>
    </>
  );
};

export default Faqs;