import { useState, useEffect, useRef } from 'react';

/**
 * Hook para detectar qué sección de la página está activa en el viewport.
 * @param {string[]} sectionIds - Un array con los IDs de las secciones a observar.
 * @param {string} rootMargin - El margen para el IntersectionObserver. Define cuándo se considera una sección "activa".
 *                                '-30% 0px -70% 0px' significa que se activa cuando la sección está en el 30% superior del viewport.
 * @returns {string | null} El ID de la sección activa.
 */
export const useActiveSection = (sectionIds, rootMargin = '-30% 0px -70% 0px') => {
  const [activeSection, setActiveSection] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    if (!sectionIds || sectionIds.length === 0) {
      setActiveSection(null);
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin }
    );

    const { current: currentObserver } = observer;

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        currentObserver.observe(element);
      }
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [sectionIds, rootMargin]);

  return activeSection;
};