import React, { useState, useEffect } from 'react';
import { Check, Star } from 'lucide-react';
import { useLocationContext } from '../contexts/LocationContext.jsx';

// 💰 Componente principal para mostrar precios inteligentes
export const SmartPricingSection = ({ program }) => {
  const { isArgentina, isLoading, country } = useLocationContext();
  
  if (!program?.price) return null;

  return (
    <div className="space-y-4">
      {/* Solo mostrar opciones adicionales si hay múltiples duraciones */}
      {hasMultipleDurations(program.price) ? (
        <InteractiveDurationSelector program={program} />
      ) : (
        <PersonalizedPriceCard program={program} />
      )}
    </div>
  );
};

// Helper para determinar si hay múltiples duraciones
const hasMultipleDurations = (price) => {
  if (price.local && price.international) return false; // Precio simple
  
  const keys = Object.keys(price);
  return keys.length > 1 && !keys.includes('regular') && !keys.includes('launch');
};

// 🎯 Tarjeta de precio personalizado destacado
const PersonalizedPriceCard = ({ program, selectedDuration, onDurationChange }) => {
  const { isArgentina, isLoading, country } = useLocationContext();
  
  const getPersonalizedPrice = (durationKey = null) => {
    const { price } = program;
    
    // Precio simple
    if (price.local && price.international) {
      return {
        current: isArgentina ? price.local : price.international,
        label: isArgentina ? 'Argentina' : 'Internacional',
        currency: isArgentina ? 'ARS' : 'USD',
        duration: program.duration
      };
    }
    
    // Precio complejo con duración específica o primera opción
    const keys = Object.keys(price).filter(key => key !== 'regular' && key !== 'launch');
    const targetKey = durationKey && price[durationKey] ? durationKey : keys[0];
    
    if (targetKey && price[targetKey]) {
      const option = price[targetKey];
      
      // Si tiene ambos precios, elegir el relevante
      if (option.local && option.international) {
        return {
          current: isArgentina ? option.local : option.international,
          label: isArgentina ? 'Argentina' : 'Internacional',
          currency: isArgentina ? 'ARS' : 'USD',
          duration: targetKey.replace('weeks', ' semanas'),
          durationKey: targetKey
        };
      }
      
      // Fallback: solo tiene un tipo de precio (ej: Speed Lab solo internacional)
      if (option.international) {
        return {
          current: option.international,
          label: 'Internacional',
          currency: 'USD',
          duration: targetKey.replace('weeks', ' semanas'),
          durationKey: targetKey
        };
      }
      
      if (option.local) {
        return {
          current: option.local,
          label: 'Argentina',
          currency: 'ARS',
          duration: targetKey.replace('weeks', ' semanas'),
          durationKey: targetKey
        };
      }
    }
    
    return null;
  };

  const getPromotionalPrice = () => {
    const { price } = program;
    
    // Buscar si hay precio regular y promocional
    if (price.regular && price.launch) {
      const regular = isArgentina ? price.regular.local : price.regular.international;
      const promo = isArgentina ? price.launch.local : price.launch.international;
      
      if (regular && promo) {
        return {
          regular,
          promotional: promo,
          label: isArgentina ? 'Argentina' : 'Internacional',
          duration: program.duration
        };
      }
    }
    
    return null;
  };

  const priceData = getPersonalizedPrice(selectedDuration);
  const promoData = getPromotionalPrice();
  
  if (!priceData && !promoData) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-medium text-emerald-100">
            Tu inversión
          </span>
        </div>
        
        {/* Precio promocional o regular */}
        {isLoading ? (
          <div className="text-2xl font-bold mb-1">Calculando...</div>
        ) : promoData ? (
          <div className="space-y-2">
            {/* Precio regular tachado */}
            <div className="flex items-center gap-3">
              <span className="text-xl text-emerald-200 line-through opacity-75">
                {promoData.regular}
              </span>
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                🔥 OFERTA ESPECIAL
              </div>
            </div>
            {/* Precio promocional destacado */}
            <div className="text-4xl font-bold">
              {promoData.promotional}
            </div>
          </div>
        ) : (
          <div className="text-4xl font-bold mb-1">
            {priceData.current}
          </div>
        )}
        
        <p className="text-emerald-100 text-sm mt-2">
          {(promoData || priceData).label} • {(promoData || priceData).duration}
        </p>
        
        {/* Beneficios incluidos - simplificado */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span className="text-xs">Seguimiento personalizado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span className="text-xs">Acceso móvil</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ⚡ Selector interactivo de duración que actualiza el precio principal
const InteractiveDurationSelector = ({ program }) => {
  const { isArgentina } = useLocationContext();
  const { price } = program;
  const [selectedDuration, setSelectedDuration] = useState(null);
  
  const priceKeys = Object.keys(price).filter(key => key !== 'regular' && key !== 'launch');
  
  if (priceKeys.length <= 1) return <PersonalizedPriceCard program={program} />;

  // Inicializar con la primera opción si no hay selección
  useEffect(() => {
    if (!selectedDuration && priceKeys.length > 0) {
      setSelectedDuration(priceKeys[0]);
    }
  }, [selectedDuration, priceKeys]);
  
  return (
    <div className="space-y-4">      
      {/* Opciones de duración clickeables - ahora primero */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
        <div className="mb-3">
          <h4 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">
            ¿Cuánto tiempo quieres entrenar?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Selecciona la duración y ve tu precio actualizado abajo
          </p>
        </div>
        
        <div className="grid gap-2">
          {priceKeys.map((key) => {
            const option = price[key];
            const duration = key.replace('weeks', ' semanas');
            const isSelected = selectedDuration === key;
            
            // Solo mostrar el precio relevante para el usuario
            const relevantPrice = isArgentina 
              ? (option.local || option.international) 
              : (option.international || option.local);
            
            if (!relevantPrice) return null;
            
            return (
              <button
                key={key}
                onClick={() => setSelectedDuration(key)}
                className={`flex justify-between items-center p-3 rounded-lg border transition-all duration-200 text-left ${
                  isSelected 
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' 
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-400'
                }`}
              >
                <span className={`font-medium ${
                  isSelected 
                    ? 'text-white' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {duration}
                </span>
                <span className={`font-bold ${
                  isSelected 
                    ? 'text-white' 
                    : 'text-slate-800 dark:text-white'
                }`}>
                  {relevantPrice}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tarjeta de precio principal - ahora abajo */}
      <PersonalizedPriceCard 
        program={program} 
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
      />
    </div>
  );
};