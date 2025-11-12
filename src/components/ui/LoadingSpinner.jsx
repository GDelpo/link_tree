import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Componente de loading genérico para usar en Suspense boundaries
 * @param {{
 *   size?: 'sm' | 'md' | 'lg',
 *   message?: string,
 *   fullScreen?: boolean
 * }} props
 */
const LoadingSpinner = ({
  size = 'md',
  message = 'Cargando...',
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center min-h-[200px]';

  return (
    <div className={containerClass}>
      <div className='flex flex-col items-center gap-3'>
        <Loader2 className={`${sizeClasses[size]} text-sky-500 animate-spin`} />
        {message && (
          <p className='text-sm text-slate-600 dark:text-slate-400 animate-pulse'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
