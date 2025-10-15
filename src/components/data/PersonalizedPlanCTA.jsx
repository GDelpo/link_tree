import React from 'react';
import { ArrowRight } from 'lucide-react';

const PersonalizedPlanCTA = ({ ctaData, contactLink, className = ''}) => {
  const { icon: Icon, title, description, buttonText } = ctaData;

  return (
    <div className={`relative w-full rounded-xl shadow-lg shadow-sky-900/10 dark:shadow-2xl dark:shadow-sky-800/20 p-6 text-center overflow-hidden ${className}`}>
      {/* Fondo con gradiente animado + overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 dark:from-sky-700 dark:to-sky-900 animate-[gradient-x_5s_ease_infinite]" />
        <div className="absolute inset-0 rounded-xl bg-black/20 dark:bg-black/40" />
      </div>

      <div className="flex flex-col items-center gap-4 text-white">
        {Icon && <Icon size={36} />}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="max-w-2xl text-slate-100 dark:text-slate-200">{description}</p>
        <a
          href={contactLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sky-700 dark:text-white bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg dark:shadow-black/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-sky-500 dark:focus:ring-offset-sky-800 transition-all duration-300"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default PersonalizedPlanCTA;
