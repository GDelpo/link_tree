import React from 'react';
import LoadingSpinner from '@components/ui/LoadingSpinner';

/**
 * Loading específico para páginas que simula el esqueleto de la estructura
 * @param {{ pageName?: string }} props
 */
const PageLoadingFallback = ({ pageName = 'página' }) => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {/* Skeleton del header */}
      <div className='text-center mb-12 animate-pulse'>
        <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mx-auto mb-2'></div>
        <div className='h-8 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto'></div>
      </div>

      {/* Skeleton del contenido */}
      <div className='bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl shadow-lg backdrop-blur-lg ring-1 ring-slate-900/5 animate-pulse'>
        <div className='space-y-4'>
          <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4'></div>
          <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2'></div>
          <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3'></div>
        </div>

        <div className='mt-8 flex justify-center'>
          <LoadingSpinner size='lg' message={`Cargando ${pageName}...`} />
        </div>
      </div>
    </div>
  );
};

export default PageLoadingFallback;
