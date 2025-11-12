/**
 * Utilidades para verificar y mejorar el contraste de colores
 * Basado en las especificaciones WCAG 2.1
 */

import { useState, useEffect } from 'react';

/**
 * Convierte un color hexadecimal a valores RGB
 * @param {string} hex - Color en formato hexadecimal (#000000)
 * @returns {Object} - Objeto con valores r, g, b
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Calcula la luminancia relativa de un color
 * @param {Object} rgb - Objeto con valores r, g, b
 * @returns {number} - Luminancia relativa (0-1)
 */
export const getLuminance = (rgb) => {
  const { r, g, b } = rgb;

  // Normalizar valores RGB (0-1)
  const [rNorm, gNorm, bNorm] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  // Fórmula de luminancia relativa
  return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
};

/**
 * Calcula el ratio de contraste entre dos colores
 * @param {string} color1 - Primer color en hexadecimal
 * @param {string} color2 - Segundo color en hexadecimal
 * @returns {number} - Ratio de contraste
 */
export const getContrastRatio = (color1, color2) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Verifica si un contraste cumple con los estándares WCAG
 * @param {number} ratio - Ratio de contraste
 * @param {string} level - Nivel deseado ('AA' o 'AAA')
 * @param {boolean} isLargeText - Si es texto grande (≥18pt regular o ≥14pt bold)
 * @returns {boolean} - True si cumple con el estándar
 */
export const meetsContrastRequirement = (
  ratio,
  level = 'AA',
  isLargeText = false
) => {
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  // Nivel AA por defecto
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
};

/**
 * Paleta de colores del proyecto con valores hex
 */
export const COLOR_PALETTE = {
  // Tema claro
  light: {
    backgrounds: {
      'slate-50': '#f8fafc',
      white: '#ffffff',
      'slate-100': '#f1f5f9',
      'slate-200': '#e2e8f0',
    },
    texts: {
      'slate-800': '#1e293b',
      'slate-700': '#334155',
      'slate-600': '#475569',
      'slate-500': '#64748b',
    },
    accents: {
      'sky-500': '#0ea5e9',
      'sky-600': '#0284c7',
      'sky-700': '#0369a1',
      'red-500': '#ef4444',
    },
  },
  // Tema oscuro
  dark: {
    backgrounds: {
      black: '#000000',
      'slate-900': '#0f172a',
      'slate-800': '#1e293b',
      'slate-700': '#334155',
    },
    texts: {
      white: '#ffffff',
      'slate-200': '#e2e8f0',
      'slate-300': '#cbd5e1',
      'slate-400': '#94a3b8',
    },
    accents: {
      'sky-400': '#38bdf8',
      'sky-500': '#0ea5e9',
      'sky-600': '#0284c7',
      'red-500': '#ef4444',
    },
  },
};

/**
 * Analiza el contraste de todas las combinaciones comunes
 * @returns {Object} - Objeto con análisis completo de contraste
 */
export const analyzeProjectContrast = () => {
  const results = {
    light: {},
    dark: {},
    issues: [],
    recommendations: [],
  };

  // Combinaciones comunes - tema claro
  const lightCombinations = [
    {
      bg: COLOR_PALETTE.light.backgrounds.white,
      text: COLOR_PALETTE.light.texts['slate-800'],
      desc: 'Texto principal sobre fondo blanco',
    },
    {
      bg: COLOR_PALETTE.light.backgrounds['slate-50'],
      text: COLOR_PALETTE.light.texts['slate-800'],
      desc: 'Texto principal sobre slate-50',
    },
    {
      bg: COLOR_PALETTE.light.backgrounds.white,
      text: COLOR_PALETTE.light.texts['slate-600'],
      desc: 'Texto secundario sobre fondo blanco',
    },
    {
      bg: COLOR_PALETTE.light.backgrounds.white,
      text: COLOR_PALETTE.light.accents['sky-600'],
      desc: 'Enlaces (sky-600) sobre fondo blanco',
    },
    {
      bg: COLOR_PALETTE.light.accents['sky-600'],
      text: COLOR_PALETTE.light.backgrounds.white,
      desc: 'Botón sky-600 con texto blanco',
    },
  ];

  // Combinaciones comunes - tema oscuro
  const darkCombinations = [
    {
      bg: COLOR_PALETTE.dark.backgrounds.black,
      text: COLOR_PALETTE.dark.texts.white,
      desc: 'Texto principal sobre fondo negro',
    },
    {
      bg: COLOR_PALETTE.dark.backgrounds['slate-900'],
      text: COLOR_PALETTE.dark.texts['slate-200'],
      desc: 'Texto base sobre slate-900',
    },
    {
      bg: COLOR_PALETTE.dark.backgrounds.black,
      text: COLOR_PALETTE.dark.accents['sky-400'],
      desc: 'Enlaces (sky-400) sobre fondo negro',
    },
    {
      bg: COLOR_PALETTE.dark.accents['sky-600'],
      text: COLOR_PALETTE.dark.texts.white,
      desc: 'Botón sky-600 con texto blanco',
    },
  ];

  // Analizar combinaciones de tema claro
  lightCombinations.forEach(({ bg, text, desc }) => {
    const ratio = getContrastRatio(bg, text);
    const meetsAA = meetsContrastRequirement(ratio, 'AA');
    const meetsAAA = meetsContrastRequirement(ratio, 'AAA');

    results.light[desc] = { ratio, meetsAA, meetsAAA };

    if (!meetsAA) {
      results.issues.push(`❌ Tema claro: ${desc} (${ratio.toFixed(2)}:1)`);
    } else if (!meetsAAA) {
      results.recommendations.push(
        `⚠️ Tema claro: ${desc} podría mejorar para AAA (${ratio.toFixed(2)}:1)`
      );
    }
  });

  // Analizar combinaciones de tema oscuro
  darkCombinations.forEach(({ bg, text, desc }) => {
    const ratio = getContrastRatio(bg, text);
    const meetsAA = meetsContrastRequirement(ratio, 'AA');
    const meetsAAA = meetsContrastRequirement(ratio, 'AAA');

    results.dark[desc] = { ratio, meetsAA, meetsAAA };

    if (!meetsAA) {
      results.issues.push(`❌ Tema oscuro: ${desc} (${ratio.toFixed(2)}:1)`);
    } else if (!meetsAAA) {
      results.recommendations.push(
        `⚠️ Tema oscuro: ${desc} podría mejorar para AAA (${ratio.toFixed(2)}:1)`
      );
    }
  });

  return results;
};

/**
 * Hook para detectar y aplicar preferencias de contraste del usuario
 */
export const useContrastPreference = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    // Detectar preferencia inicial
    const mediaQuery = window.matchMedia('(prefers-contrast: more)');
    setPrefersHighContrast(mediaQuery.matches);

    // Escuchar cambios
    const handler = (e) => setPrefersHighContrast(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersHighContrast;
};

export default {
  hexToRgb,
  getLuminance,
  getContrastRatio,
  meetsContrastRequirement,
  analyzeProjectContrast,
  useContrastPreference,
  COLOR_PALETTE,
};
