import React from 'react';
import Accordion from './Accordion';
import { faqData } from '../data/faqData'; // La importación sigue igual

const FaqSection = () => {
  const accordionItems = faqData.map((item) => ({
    ...item,
    collapsibleContent: (
      <p className="text-slate-500 dark:text-slate-400">
        {item.collapsibleContent}
      </p>
    ),
  }));

  return (
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-sky-700 dark:from-white dark:to-sky-400">
          Preguntas Frecuentes
        </h2>
        <Accordion items={accordionItems} />
      </div>
  );
};

export default FaqSection;