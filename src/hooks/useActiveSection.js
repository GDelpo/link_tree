import { useState, useEffect } from 'react';

/**
 * Hook simplificado para detectar qué sección está activa en el viewport.
 * @param {string[]} sectionIds - Array con los IDs de las secciones a observar.
 * @param {string} rootMargin - Margen para el IntersectionObserver.
 * @returns {string | null} El ID de la sección activa.
 */
export const useActiveSection = (sectionIds, rootMargin = '-30% 0px -70% 0px') => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!sectionIds?.length) {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin }
    );

    // Observar todas las secciones existentes
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);
    
    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeSection;
};