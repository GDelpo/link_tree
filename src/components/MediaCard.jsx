import React from 'react';
import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';

/**
 * Componente genérico para tarjetas de medios (Instagram, YouTube, etc.)
 * @param {{
 *   item: { permalink: string, thumbnail_url: string },
 *   type: 'instagram' | 'youtube',
 *   className?: string
 * }} props
 */
const MediaCard = ({ item, type, className = '' }) => {
  const isInstagram = type === 'instagram';
  const imageUrl = item.thumbnail_url;
  const link = item.permalink;
  const Icon = isInstagram ? SiInstagram : SiYoutube;

  // Usar aspect-[3/4] para Instagram, aspect-square para YouTube
  const aspectClass = isInstagram ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group block rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1
        w-full border-slate-200 dark:border-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/10
        ${aspectClass}
        ${className}
      `}
    >
      <div className="relative w-full h-full">
        <img
          src={imageUrl}
          alt={type}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay con ícono */}
        <div className="
          absolute inset-0 transition-opacity duration-300 flex items-center justify-center
          bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100
        ">
          <Icon className="text-white w-12 h-12 transform transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
    </a>
  );
};

export default MediaCard;