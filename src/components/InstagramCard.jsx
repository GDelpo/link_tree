import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramCard = ({ post }) => {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/10"
    >
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Instagram className="text-white w-12 h-12 transform transition-transform duration-300 group-hover:scale-110" />
      </div>
    </a>
  );
};

export default InstagramCard;