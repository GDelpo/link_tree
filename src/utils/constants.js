/**
 * Constantes para clases CSS comunes para evitar duplicación
 */

// Clases para tarjetas de contenido con efecto vidrio
export const GLASS_CARD_CLASSES =
  'bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg ring-1 ring-slate-900/5 overflow-hidden transition-colors duration-300';

// Clases base para animaciones de entrada
export const FADE_IN_CLASSES =
  'opacity-0 translate-y-8 transition-all duration-1000 ease-in-out';
export const FADE_IN_ACTIVE_CLASSES = 'opacity-100 translate-y-0';

// Clases para gradientes comunes
export const SKY_GRADIENT_CLASSES =
  'from-sky-600 to-cyan-600 dark:from-sky-600 dark:to-cyan-600';
export const EMERALD_GRADIENT_CLASSES = 'from-emerald-500 to-green-600';

// Clases para contenedores principales
export const MAIN_CONTAINER_CLASSES = 'max-w-4xl mx-auto';
export const PAGE_PADDING_CLASSES = 'px-4 sm:px-6 lg:px-8';

// Clases para transiciones comunes
export const SMOOTH_TRANSITION_CLASSES = 'transition-all duration-300';
export const COLOR_TRANSITION_CLASSES = 'transition-colors duration-300';

export default {
  GLASS_CARD_CLASSES,
  FADE_IN_CLASSES,
  FADE_IN_ACTIVE_CLASSES,
  SKY_GRADIENT_CLASSES,
  EMERALD_GRADIENT_CLASSES,
  MAIN_CONTAINER_CLASSES,
  PAGE_PADDING_CLASSES,
  SMOOTH_TRANSITION_CLASSES,
  COLOR_TRANSITION_CLASSES,
};
