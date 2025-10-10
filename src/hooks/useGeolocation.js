import { useState, useEffect } from 'react';

// 🌍 Hook híbrido para detectar ubicación con múltiples fallbacks
export const useGeolocation = () => {
  const [locationData, setLocationData] = useState({
    country: null,
    countryCode: null,
    isArgentina: null,
    isLoading: true,
    error: null,
    currency: null,
    detectionMethod: null // Para debugging
  });

  // 🎯 Método 1: Geolocation API del navegador (más preciso)
  const tryBrowserGeolocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      console.log('🎯 Intentando Geolocation API del navegador...');
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log(`📍 Coordenadas obtenidas: ${latitude}, ${longitude}`);
            
            // Usar reverse geocoding con API gratuita
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
            );
            
            if (response.ok) {
              const data = await response.json();
              resolve({
                country: data.countryName,
                countryCode: data.countryCode,
                currency: getCountryCurrency(data.countryCode),
                detectionMethod: 'Browser Geolocation API'
              });
            } else {
              reject(new Error('Reverse geocoding failed'));
            }
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          console.log('❌ Geolocation API falló:', error.message);
          reject(error);
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    });
  };

  // 🕒 Método 2: Timezone detection (confiable y automático)
  const tryTimezoneDetection = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log('🕒 Intentando detección por timezone...');
        
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(`⏰ Timezone detectado: ${timezone}`);
        
        // Mapeo de timezones a países (los más comunes)
        const timezoneToCountry = {
          // Argentina
          'America/Argentina/Buenos_Aires': { country: 'Argentina', countryCode: 'AR', currency: 'ARS' },
          'America/Argentina/Cordoba': { country: 'Argentina', countryCode: 'AR', currency: 'ARS' },
          'America/Argentina/Mendoza': { country: 'Argentina', countryCode: 'AR', currency: 'ARS' },
          
          // Otros países latinoamericanos
          'America/Mexico_City': { country: 'México', countryCode: 'MX', currency: 'MXN' },
          'America/Bogota': { country: 'Colombia', countryCode: 'CO', currency: 'COP' },
          'America/Lima': { country: 'Perú', countryCode: 'PE', currency: 'PEN' },
          'America/Santiago': { country: 'Chile', countryCode: 'CL', currency: 'CLP' },
          'America/Sao_Paulo': { country: 'Brasil', countryCode: 'BR', currency: 'BRL' },
          
          // España
          'Europe/Madrid': { country: 'España', countryCode: 'ES', currency: 'EUR' },
          
          // Estados Unidos
          'America/New_York': { country: 'Estados Unidos', countryCode: 'US', currency: 'USD' },
          'America/Chicago': { country: 'Estados Unidos', countryCode: 'US', currency: 'USD' },
          'America/Denver': { country: 'Estados Unidos', countryCode: 'US', currency: 'USD' },
          'America/Los_Angeles': { country: 'Estados Unidos', countryCode: 'US', currency: 'USD' },
        };
        
        const countryData = timezoneToCountry[timezone];
        
        if (countryData) {
          resolve({
            ...countryData,
            detectionMethod: 'Timezone Detection'
          });
        } else {
          // Si no está en el mapeo, intentar detectar por región
          if (timezone.includes('Argentina')) {
            resolve({
              country: 'Argentina',
              countryCode: 'AR',
              currency: 'ARS',
              detectionMethod: 'Timezone Detection (Pattern)'
            });
          } else {
            reject(new Error('Timezone not mapped'));
          }
        }
        
      } catch (error) {
        console.log('❌ Timezone detection falló:', error.message);
        reject(error);
      }
    });
  };

  // 🗣️ Método 3: Language + Locale detection
  const tryLanguageDetection = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log('🗣️ Intentando detección por idioma/locale...');
        
        const language = navigator.language || navigator.languages?.[0];
        console.log(`🌐 Idioma detectado: ${language}`);
        
        // Mapeo de locales a países
        const localeToCountry = {
          'es-AR': { country: 'Argentina', countryCode: 'AR', currency: 'ARS' },
          'es-MX': { country: 'México', countryCode: 'MX', currency: 'MXN' },
          'es-CO': { country: 'Colombia', countryCode: 'CO', currency: 'COP' },
          'es-CL': { country: 'Chile', countryCode: 'CL', currency: 'CLP' },
          'es-PE': { country: 'Perú', countryCode: 'PE', currency: 'PEN' },
          'es-ES': { country: 'España', countryCode: 'ES', currency: 'EUR' },
          'pt-BR': { country: 'Brasil', countryCode: 'BR', currency: 'BRL' },
          'en-US': { country: 'Estados Unidos', countryCode: 'US', currency: 'USD' },
        };
        
        const countryData = localeToCountry[language];
        
        if (countryData) {
          resolve({
            ...countryData,
            detectionMethod: 'Language Detection'
          });
        } else if (language.startsWith('es-')) {
          // Si es español pero no sabemos el país específico, defaultear a internacional
          resolve({
            country: 'Internacional',
            countryCode: 'INT',
            currency: 'USD',
            detectionMethod: 'Language Detection (Generic Spanish)'
          });
        } else {
          reject(new Error('Language not mapped'));
        }
        
      } catch (error) {
        console.log('❌ Language detection falló:', error.message);
        reject(error);
      }
    });
  };

  // 🌐 Método 4: APIs externas (último recurso)
  const tryExternalAPIs = async () => {
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
      }
    ];

    console.log('🌐 Intentando APIs externas como último recurso...');
    
    for (const api of GEO_APIS) {
      try {
        const response = await fetch(api.url, {
          method: 'GET',
          timeout: 5000
        });
        
        if (response.ok) {
          const data = await response.json();
          const parsed = api.parser(data);
          
          return {
            country: parsed.country,
            countryCode: parsed.countryCode,
            currency: parsed.currency || getCountryCurrency(parsed.countryCode),
            detectionMethod: 'External API'
          };
        }
      } catch (error) {
        console.log(`❌ API ${api.url} falló:`, error.message);
        continue;
      }
    }
    
    throw new Error('All external APIs failed');
  };

  // 💰 Helper para obtener moneda por código de país
  const getCountryCurrency = (countryCode) => {
    const currencyMap = {
      'AR': 'ARS',
      'US': 'USD',
      'MX': 'MXN',
      'CO': 'COP',
      'CL': 'CLP',
      'PE': 'PEN',
      'BR': 'BRL',
      'ES': 'EUR',
      'UY': 'UYU',
      'PY': 'PYG',
    };
    
    return currencyMap[countryCode] || 'USD';
  };

  // 🔄 Método principal con cascada de fallbacks
  const detectLocation = async () => {
    console.log('🌍 Iniciando detección híbrida de ubicación...');
    
    const methods = [
      tryBrowserGeolocation,
      tryTimezoneDetection,
      tryLanguageDetection,
      tryExternalAPIs
    ];

    for (const method of methods) {
      try {
        const result = await method();
        
        if (result.country && result.countryCode) {
          console.log(`✅ Ubicación detectada con ${result.detectionMethod}:`, result);
          
          return {
            ...result,
            isArgentina: result.countryCode === 'AR'
          };
        }
      } catch (error) {
        console.log(`❌ Método falló, probando siguiente...`);
        continue;
      }
    }
    
    // Si todo falla, defaultear a internacional
    console.log('⚠️ Todos los métodos fallaron, usando valores por defecto');
    return {
      country: 'Internacional',
      countryCode: 'INT',
      currency: 'USD',
      isArgentina: false,
      detectionMethod: 'Default Fallback'
    };
  };

  // 💾 Sistema de caché mejorado
  const CACHE_KEY = 'user_location_v2';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

  const getCachedLocation = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log('📦 Usando ubicación desde caché:', data);
          return data;
        }
      }
    } catch (error) {
      console.error('Error leyendo caché:', error);
    }
    return null;
  };

  const setCachedLocation = (locationData) => {
    try {
      const cacheData = {
        data: locationData,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      console.log('💾 Ubicación guardada en caché');
    } catch (error) {
      console.error('Error guardando en caché:', error);
    }
  };

  // 🚀 Effect principal
  useEffect(() => {
    const initializeLocation = async () => {
      // Intentar caché primero
      const cached = getCachedLocation();
      if (cached) {
        setLocationData({
          ...cached,
          isLoading: false,
          error: null
        });
        return;
      }

      // Si no hay caché, detectar ubicación
      try {
        setLocationData(prev => ({ ...prev, isLoading: true, error: null }));
        
        const location = await detectLocation();
        
        const finalData = {
          country: location.country,
          countryCode: location.countryCode,
          isArgentina: location.isArgentina,
          currency: location.currency,
          detectionMethod: location.detectionMethod,
          isLoading: false,
          error: null
        };
        
        setLocationData(finalData);
        setCachedLocation(finalData);
        
      } catch (error) {
        console.error('❌ Error en detección de ubicación:', error);
        
        // Fallback final con valores por defecto
        const fallbackData = {
          country: 'Internacional',
          countryCode: 'INT',
          isArgentina: false,
          currency: 'USD',
          detectionMethod: 'Error Fallback',
          isLoading: false,
          error: error.message
        };
        
        setLocationData(fallbackData);
      }
    };

    initializeLocation();
  }, []);

  // 🔄 Método público para refrescar ubicación
  const refetchLocation = async () => {
    localStorage.removeItem(CACHE_KEY);
    setLocationData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const location = await detectLocation();
      const finalData = {
        country: location.country,
        countryCode: location.countryCode,
        isArgentina: location.isArgentina,
        currency: location.currency,
        detectionMethod: location.detectionMethod,
        isLoading: false,
        error: null
      };
      
      setLocationData(finalData);
      setCachedLocation(finalData);
    } catch (error) {
      setLocationData(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
  };

  return {
    ...locationData,
    refetchLocation
  };
};