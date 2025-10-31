import React from 'react';

const TimelineItem = ({ date, title, subtitle }) => {
  return (
    <article role='listitem' className='relative pl-8 sm:pl-12 py-4 group'>
      {/* Icono y Línea vertical */}
      <div
        className='flex flex-col items-center w-8 sm:w-12 absolute left-0 top-0 h-full'
        aria-hidden='true'
      >
        <div className='w-2 h-2 bg-sky-600 rounded-full mt-5'></div>
        <div className='w-px h-full bg-slate-300 dark:bg-slate-700 group-last:hidden'></div>
      </div>

      {/* Contenido */}
      <div className='bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg'>
        <time
          className='text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-1'
          dateTime={date}
        >
          {date}
        </time>
        <h4 className='font-bold text-slate-800 dark:text-white'>{title}</h4>
        <p className='text-sm text-slate-600 dark:text-slate-300'>{subtitle}</p>
      </div>
    </article>
  );
};

export default TimelineItem;
