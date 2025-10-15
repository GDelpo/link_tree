// Utilities and constants shared by program-related features

// Emojis used to tag programs
export const PROGRAM_EMOJIS = {
  strength: '🏋🏻‍♀️',
  speed: '🏃🏼‍♂️➡️',
  athletic: '💪',
  beginner: '🎯',
};

// Standardized access info applied to most programs
export const STANDARD_ACCESS = {
  platform: 'Aplicación móvil',
  features: [
    'Acceso a través de tu celular de forma sencilla',
    'Videos de cada ejercicio con indicaciones correspondientes',
    'Programa disponible 2 semanas adicionales después de finalizar',
  ],
};

// Default bonus block
export const STANDARD_BONUS = {
  title: 'SEGUIMIENTO PERSONALIZADO',
  description:
    'A diferencia de los programas tradicionales, incluye seguimiento personal. Subí una historia entrenando a Instagram etiquetándome y te ayudo o corrijo según sea necesario.',
};

// Basic equipment list
export const BASIC_EQUIPMENT = [
  'Peso libre (barras y mancuernas)',
  'Idealmente una pelota para lanzar',
  'Herramientas de reemplazo para ejercicios según necesidades',
];

// Factory to build a program object merging defaults
export const createProgram = (key, config) => {
  return {
    id: key.toLowerCase().replace(/\s+/g, '-').replace(/&/g, ''),
    title: `PROGRAMA ${key}`,
    emoji: config.emoji || PROGRAM_EMOJIS.strength,
    shortDescription: config.shortDescription,
    duration: config.duration,
    frequency: config.frequency,
    price: config.price,
    Icon: config.Icon,
    gradientClasses: config.gradientClasses,
    targetAudience: config.targetAudience,
    description: config.description,
    access: config.access || STANDARD_ACCESS,
    equipment: config.equipment || BASIC_EQUIPMENT,
    bonusFeatures: config.bonusFeatures || [STANDARD_BONUS],
    paymentMethods: config.paymentMethods || { local: ['Transferencia'], international: ['PayPal'] },
    ...(config.specialOffer && { specialOffer: config.specialOffer }),
    ...(config.specialNote && { specialNote: config.specialNote }),
  };
};

// Compute the primary price string based on location
export const getSmartPrice = (priceStructure, isArgentina) => {
  if (!priceStructure) return 'Consultar';

  // Simple structure (local/international)
  if (priceStructure.local && priceStructure.international) {
    return isArgentina ? priceStructure.local : priceStructure.international;
  }

  // Complex structure (multiple durations/options)
  const keys = Object.keys(priceStructure);
  if (keys.length === 0) return 'Consultar';

  const firstKey = keys[0];
  const firstPrice = priceStructure[firstKey];

  if (firstPrice?.local && firstPrice?.international) {
    return isArgentina ? firstPrice.local : firstPrice.international;
  } else if (firstPrice?.international) {
    return firstPrice.international;
  }

  return 'Consultar';
};

export const getSmartPriceDisplay = (priceStructure, isArgentina) => {
  if (!priceStructure) return 'Consultar precio';

  if (priceStructure.local && priceStructure.international) {
    const price = isArgentina ? priceStructure.local : priceStructure.international;
    const flag = isArgentina ? '🇦🇷' : '🌍';
    return `${flag} ${price}`;
  }

  const keys = Object.keys(priceStructure);
  if (keys.length === 0) return 'Consultar precio';

  return `${isArgentina ? '🇦🇷' : '🌍'} Desde ${getSmartPrice(priceStructure, isArgentina)}`;
};
