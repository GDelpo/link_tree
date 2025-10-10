import React from 'react';
import { Instagram, PlayCircle } from 'lucide-react';

/**
 * Componente genérico para tarjetas de medios (Instagram, YouTube, etc.)
 * @param {{
 *   item: { link: string, imageUrl: string, title: string, caption?: string, thumbnailUrl?: string },
 *   type: 'instagram' | 'youtube',
 *   className?: string
 * }} props
 */
const MediaCard = ({ item, type, className = '' }) => {
  const isInstagram = type === 'instagram';
  const imageUrl = isInstagram ? item.imageUrl : item.thumbnailUrl;
  const title = isInstagram ? item.caption : item.title;
  const Icon = isInstagram ? Instagram : PlayCircle;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group block rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1
        ${isInstagram 
          ? 'w-full aspect-square border-slate-200 dark:border-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/10' 
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-sky-500/50'
        }
        ${className}
      `}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full object-cover transition-transform duration-300 ${
            isInstagram 
              ? 'h-full group-hover:scale-110' 
              : 'aspect-video'
          }`}
        />
        {/* Overlay con ícono */}
        <div className={`
          absolute inset-0 transition-opacity duration-300 flex items-center justify-center
          ${isInstagram 
            ? 'bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100' 
            : 'bg-black/30 opacity-0 group-hover:opacity-100'
          }
        `}>
          <Icon className={`
            text-white transform transition-transform duration-300 group-hover:scale-110
            ${isInstagram ? 'w-12 h-12' : 'w-14 h-14'}
          `} />
        </div>
      </div>
      {/* Título para YouTube */}
      {!isInstagram && (
        <div className="p-4">
          <h4 className="font-semibold text-slate-800 dark:text-white truncate" title={title}>
            {title}
          </h4>
        </div>
      )}
    </a>
  );
};

export default MediaCard;