import React, { createContext, useContext } from 'react';
import { useGeolocation } from '@hooks/useGeolocation.js';

// 🌍 Contexto para información de geolocalización
const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const locationData = useGeolocation();

  return (
    <LocationContext.Provider value={locationData}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook para usar el contexto de ubicación
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext debe usarse dentro de LocationProvider');
  }
  return context;
};

// 💰 Componente que muestra indicador de ubicación y precios
export const LocationIndicator = ({ className = '' }) => {
  const { country, countryCode, isArgentina, isLoading, error } = useLocationContext();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 text-sm text-slate-500 ${className}`}>
        <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
        <span>Detectando ubicación...</span>
      </div>
    );
  }

  if (error && !country) {
    return (
      <div className={`flex items-center gap-2 text-sm text-slate-500 ${className}`}>
        <span className="text-orange-500">⚠️</span>
        <span>Ubicación no detectada</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <span className="text-lg">
        {isArgentina ? '🇦🇷' : '🌍'}
      </span>
      <span className="text-slate-600 dark:text-slate-300">
        {isArgentina ? 'Argentina' : country || 'Internacional'}
      </span>
      {error && (
        <span className="text-xs text-orange-500" title={error}>
          (guardado)
        </span>
      )}
    </div>
  );
};