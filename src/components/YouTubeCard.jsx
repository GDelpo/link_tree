import React from 'react';
import { PlayCircle } from 'lucide-react';

const YouTubeCard = ({ video }) => {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="text-white w-14 h-14 transform group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-slate-800 dark:text-white truncate" title={video.title}>
          {video.title}
        </h4>
      </div>
    </a>
  );
};

export default YouTubeCard;