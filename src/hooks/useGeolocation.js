import { useState, useEffect } from 'react';

// 🌍 Hook personalizado para detectar ubicación del usuario
export const useGeolocation = () => {
  const [locationData, setLocationData] = useState({
    country: null,
    countryCode: null,
    isArgentina: null,
    isLoading: true,
    error: null,
    currency: null
  });

  // Lista de APIs gratuitas para geolocalización por IP
  const GEO_APIS = [
    {
      url: 'https://ipapi.co/json/',
      parser: (data) => ({
        country: data.country_name,
        countryCode: data.country_code,
        currency: data.currency
      })
    },
    {
      url: 'http://ip-api.com/json/',
      parser: (data) => ({
        country: data.country,
        countryCode: data.countryCode,
        currency: data.currency
      })
    },
    {
      url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
      parser: (data) => ({
        country: data.country_name,
        countryCode: data.country_code2,
        currency: data.currency?.code
      })
    }
  ];

  const detectLocation = async () => {
    // Intentar cada API hasta que una funcione
    for (const api of GEO_APIS) {
      try {
        console.log(`🌍 Intentando geolocalización con ${api.url}`);
        
        const response = await fetch(api.url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          // Timeout de 5 segundos
          signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const parsed = api.parser(data);
        
        if (parsed.country && parsed.countryCode) {
          const isArgentina = parsed.countryCode === 'AR';
          
          setLocationData({
            country: parsed.country,
            countryCode: parsed.countryCode,
            isArgentina,
            currency: parsed.currency,
            isLoading: false,
            error: null
          });

          console.log(`✅ Ubicación detectada: ${parsed.country} (${parsed.countryCode})`);
          
          // Guardar en localStorage para futuras sesiones
          localStorage.setItem('userLocation', JSON.stringify({
            country: parsed.country,
            countryCode: parsed.countryCode,
            isArgentina,
            timestamp: Date.now()
          }));

          return; // Salir del loop si fue exitoso
        }
      } catch (error) {
        console.warn(`⚠️ Error con ${api.url}:`, error.message);
        continue; // Intentar siguiente API
      }
    }

    // Si todas las APIs fallaron, usar datos guardados o fallback
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        const isRecent = (Date.now() - parsed.timestamp) < 24 * 60 * 60 * 1000; // 24 horas
        
        if (isRecent) {
          console.log('📱 Usando ubicación guardada:', parsed);
          setLocationData({
            ...parsed,
            isLoading: false,
            error: 'Usando ubicación guardada'
          });
          return;
        }
      } catch (e) {
        console.warn('Error parseando ubicación guardada:', e);
      }
    }

    // Fallback final
    console.log('🌐 Fallback: Asumiendo ubicación internacional');
    setLocationData({
      country: 'Unknown',
      countryCode: null,
      isArgentina: false, // Por defecto internacional
      currency: 'USD',
      isLoading: false,
      error: 'No se pudo detectar ubicación'
    });
  };

  useEffect(() => {
    detectLocation();
  }, []);

  // Función para forzar redetección
  const refetch = () => {
    setLocationData(prev => ({ ...prev, isLoading: true, error: null }));
    detectLocation();
  };

  return {
    ...locationData,
    refetch
  };
};

// 💰 Hook específico para lógica de precios
export const usePricing = () => {
  const { isArgentina, isLoading, country, countryCode } = useGeolocation();

  const getPriceForUser = (priceStructure) => {
    if (!priceStructure) return "Consultar";

    // Si tiene estructura simple (local/international)
    if (priceStructure.local && priceStructure.international) {
      return isArgentina ? priceStructure.local : priceStructure.international;
    }

    // Si tiene estructura compleja con múltiples duraciones
    const keys = Object.keys(priceStructure);
    if (keys.length === 0) return "Consultar";

    // Tomar el primer precio disponible
    const firstKey = keys[0];
    const firstPrice = priceStructure[firstKey];

    if (firstPrice.local && firstPrice.international) {
      return isArgentina ? firstPrice.local : firstPrice.international;
    } else if (firstPrice.international) {
      return firstPrice.international;
    }

    return "Consultar";
  };

  const getCurrencySymbol = () => {
    return isArgentina ? '$' : 'U$';
  };

  const getPriceLabel = () => {
    return isArgentina ? 'Precio Argentina' : 'Precio Internacional';
  };

  return {
    isArgentina,
    isLoading,
    country,
    countryCode,
    getPriceForUser,
    getCurrencySymbol,
    getPriceLabel
  };
};