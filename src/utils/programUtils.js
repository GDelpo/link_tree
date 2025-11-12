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
    paymentMethods: config.paymentMethods || {
      local: ['Transferencia'],
      international: ['PayPal'],
    },
    ...(config.specialNote && { specialNote: config.specialNote }),
  };
};

// Normalize various price shapes into a single canonical structure
// Canonical: { options: { [key]: { regular: { local?, international? }, specialOffer?: { local?, international? } } } }
export const normalizePrice = (price) => {
  if (!price) return { options: {} };
  // If already normalized-like
  if (price.options) return { options: { ...price.options } };

  const options = {};

  const looksLikeSimple =
    typeof price.local === 'string' || typeof price.international === 'string';
  const topHasBands =
    price.regular || price.launch || price.special || price.specialOffer;

  if (looksLikeSimple || topHasBands) {
    options.default = {
      regular:
        price.regular ||
        (looksLikeSimple
          ? { local: price.local, international: price.international }
          : undefined),
      specialOffer:
        price.specialOffer || price.launch || price.special || undefined,
    };
    return { options };
  }

  // Assume keys are options like '9weeks', '12weeks'
  Object.entries(price).forEach(([key, val]) => {
    if (!val || typeof val !== 'object') return;
    const regular =
      val.regular ||
      (val.local || val.international
        ? { local: val.local, international: val.international }
        : undefined);
    const specialOffer =
      val.specialOffer || val.launch || val.special || undefined;
    options[key] = {
      ...(regular ? { regular } : {}),
      ...(specialOffer ? { specialOffer } : {}),
    };
  });

  return { options };
};

// Compute the primary price string based on location
export const getSmartPrice = (priceStructure, isArgentina) => {
  if (!priceStructure) return 'Consultar';
  const { options } = normalizePrice(priceStructure);
  const keys = Object.keys(options);
  if (keys.length === 0) return 'Consultar';
  const first = options.default ? options.default : options[keys[0]];
  if (!first) return 'Consultar';
  const band = first.specialOffer || first.regular || {};
  if (isArgentina && band.local) return band.local;
  if (!isArgentina && band.international) return band.international;
  // Fallback to whichever is available
  return band.local || band.international || 'Consultar';
};

export const getSmartPriceDisplay = (priceStructure, isArgentina) => {
  if (!priceStructure) return 'Consultar precio';
  const flag = isArgentina ? '🇦🇷' : '🌍';
  const { options } = normalizePrice(priceStructure);
  const keys = Object.keys(options);
  if (keys.length === 0) return 'Consultar precio';
  if (keys.length === 1) {
    const only = options[keys[0]];
    const band = only.specialOffer || only.regular || {};
    const val = isArgentina
      ? band.local || band.international
      : band.international || band.local;
    return `${flag} ${val || 'Consultar precio'}`;
  }
  return `${flag} Desde ${getSmartPrice(priceStructure, isArgentina)}`;
};
