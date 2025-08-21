import React from 'react';

const TimelineItem = ({ date, title, subtitle }) => {
  return (
    <div className="relative pl-8 sm:pl-12 py-4 group">
      {/* Icono y Línea vertical */}
      <div className="flex flex-col items-center w-8 sm:w-12 absolute left-0 top-0 h-full">
        <div className="w-2 h-2 bg-sky-500 rounded-full mt-5"></div>
        <div className="w-px h-full bg-slate-300 dark:bg-slate-700 group-last:hidden"></div>
      </div>
      
      {/* Contenido */}
      <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg">
        <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-1">{date}</p>
        <h4 className="font-bold text-slate-800 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>
    </div>
  );
};

export default TimelineItem;