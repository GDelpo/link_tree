import React from "react";
import { ArrowRight, Clock, Info } from "lucide-react";

const ProgramCard = ({
  title,
  description,
  duration,
  link,
  Icon,
  gradientClasses,
  ctaText = "Ver Detalles",
  detailedInfo = null, // Nueva prop para información detallada
  onOpenModal = null, // Nueva prop para manejar apertura del modal
}) => {
  const handleCardClick = () => {
    if (detailedInfo && onOpenModal) {
      onOpenModal(detailedInfo);
    } else {
      // Fallback al comportamiento original si no hay info detallada
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <article 
      className="bg-slate-100/50 dark:bg-slate-800/50 p-5 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700 shadow-md hover:shadow-lg dark:shadow-lg dark:shadow-sky-950/20 hover:dark:shadow-2xl hover:dark:shadow-sky-800/20 hover:-translate-y-0.5 transition-all duration-300
        grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5 items-center"
      aria-labelledby={`program-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      
      {/* Icono + contenido */}
      <div className="flex items-start gap-4">
        {Icon && gradientClasses && (
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradientClasses}`}
            aria-hidden="true"
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
        )}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h4 
              id={`program-${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-bold text-lg text-slate-800 dark:text-slate-100 leading-tight"
            >
              {title}
            </h4>
            <div 
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full"
              aria-label={`Duración: ${duration}`}
            >
              <Clock size={12} aria-hidden="true" />
              <span>{duration}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-snug">
            {description}
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleCardClick}
        className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-lg shadow-md dark:shadow-lg dark:shadow-black/25 overflow-hidden group focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:outline-none transition-all duration-200"
        aria-label={`${ctaText} de ${title}`}
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-600 dark:to-cyan-600 animate-[gradient-x_4s_ease_infinite] transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundSize: "200% 200%" }}
          aria-hidden="true"
        ></span>
        <span className="relative z-10">{ctaText}</span>
        {detailedInfo ? (
          <Info className="w-4 h-4 relative z-10" aria-hidden="true" />
        ) : (
          <ArrowRight className="w-4 h-4 relative z-10" aria-hidden="true" />
        )}
      </button>
      
    </article>
  );
};

export default ProgramCard;
