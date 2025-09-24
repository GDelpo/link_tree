import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

/**
 * Muestra una tarjeta para un programa de entrenamiento específico.
 * Incluye un botón de llamada a la acción (CTA) con un gradiente animado.
 * @param {{ title: string, description: string, duration: string, link: string, Icon: React.ElementType, gradientClasses: string, ctaText?: string }} props
 */
const ProgramCard = ({ title, description, duration, link, Icon, gradientClasses, ctaText = 'Solicitar Información' }) => {
  return (
    <div className="bg-slate-100/50 dark:bg-slate-800/50 p-4 rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md hover:shadow-lg dark:shadow-lg dark:shadow-sky-950/20 hover:dark:shadow-2xl hover:dark:shadow-sky-800/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex-grow flex items-start gap-4 w-full">
        {/* Icono con gradiente */}
        {Icon && gradientClasses && (
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${gradientClasses}`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h4 className="font-bold text-slate-800 dark:text-slate-100">{title}</h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full transition-colors duration-300">
              <Clock size={12} />
              <span>{duration}</span>
            </div>
          </div>
          <p className="text-xs uppercase text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-2 sm:mt-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-md dark:shadow-lg dark:shadow-black/25 overflow-hidden group flex-shrink-0"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-500 dark:from-sky-600 dark:to-cyan-600 animate-[gradient-x_4s_ease_infinite] transition-transform duration-300 group-hover:scale-110" style={{ backgroundSize: '200% 200%' }}></span>
        <span className="relative z-10">{ctaText}</span>
        <ArrowRight className="w-4 h-4 relative z-10" />
      </a>
    </div>
  );
};

export default ProgramCard;