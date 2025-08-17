import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

const PersonalizedPlanCTA = ({contactLink}) => {
  return (
    <section className="relative w-full rounded-xl shadow-lg shadow-sky-900/10 p-6 text-center overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-400 to-sky-600 dark:from-sky-700 dark:to-sky-900 animate-[gradient-x_5s_ease_infinite]"></div>
      
      <div className="flex flex-col items-center gap-4 text-white">
        <MessageCircle size={36} />
        <h3 className="text-xl font-bold">
          ¿Buscás algo más?
        </h3>
        <p className="text-sky-100 dark:text-sky-200 max-w-2xl">
          Si ninguno de estos programas se ajusta a tus objetivos o querés llevar tu entrenamiento al siguiente nivel, creemos juntos un plan 100% personalizado para vos.
        </p>
        <a
          href={contactLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sky-700 dark:text-white bg-white dark:bg-slate-800 rounded-lg shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-sky-500 dark:focus:ring-offset-sky-800 transition-all transform"
        >
          ¡Hablemos!
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default PersonalizedPlanCTA;