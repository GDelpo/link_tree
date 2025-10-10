import React from 'react';
import { RefreshCw, MapPin, Globe } from 'lucide-react';
import { useLocationContext } from '../contexts/LocationContext.jsx';

// 🛠️ Componente de desarrollo para testear geolocalización
const GeolocationDebugger = ({ className = '' }) => {
  const { 
    country, 
    countryCode, 
    isArgentina, 
    isLoading, 
    error, 
    currency,
    refetch 
  } = useLocationContext();

  if (!import.meta.env.DEV) return null; // Solo en desarrollo

  return (
    <div className={`fixed bottom-4 left-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg text-xs max-w-xs z-50 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-800 dark:text-white">Geolocalización Debug</h4>
        <button 
          onClick={refetch}
          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          title="Redetectar ubicación"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-1 text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          <span>{isLoading ? 'Detectando...' : (country || 'Desconocido')}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="w-3 h-3" />
          <span>{countryCode || 'N/A'} | {currency || 'N/A'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg">{isArgentina ? '🇦🇷' : '🌍'}</span>
          <span className="font-medium">
            {isArgentina ? 'Argentina' : 'Internacional'}
          </span>
        </div>
        
        {error && (
          <div className="text-orange-500 text-xs mt-1">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeolocationDebugger;