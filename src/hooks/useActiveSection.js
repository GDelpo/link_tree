import { useState, useEffect, useRef } from 'react';

/**
 * Hook simplificado para detectar qué sección está activa en el viewport.
 * @param {string[]} sectionIds - Array con los IDs de las secciones a observar.
 * @param {string} rootMargin - Margen para el IntersectionObserver.
 * @returns {string | null} El ID de la sección activa.
 */
export const useActiveSection = (sectionIds, options = {}) => {
  const { headerOffset = 64 } = typeof options === 'number' ? { headerOffset: options } : options;

  const [activeSection, setActiveSection] = useState(null);
  const activeRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (!sectionIds?.length) {
      setActiveSection(null);
      return undefined;
    }

    const getElement = (id) => document.getElementById(id);

    const computeActive = () => {
      // Si estamos al fondo del documento, forzar la última sección como activa
      const atBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (atBottom) return sectionIds[sectionIds.length - 1] || null;

      // Elegir la última sección cuyo top esté por encima del header sticky
      let current = null;
      for (const id of sectionIds) {
        const el = getElement(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - headerOffset <= 0) {
          current = id;
        } else {
          break;
        }
      }
      return current || sectionIds[0] || null;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const id = computeActive();
        tickingRef.current = false;
        if (id && id !== activeRef.current) {
          activeRef.current = id;
          setActiveSection(id);
        }
      });
    };

    // Inicializar activo (considerando hash si existe)
    const hashId = window.location.hash?.slice(1);
    if (hashId && sectionIds.includes(hashId)) {
      activeRef.current = hashId;
      setActiveSection(hashId);
    } else {
      const initial = (typeof window !== 'undefined') ? computeActive() : sectionIds[0] || null;
      activeRef.current = initial;
      setActiveSection(initial);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    // Trigger once to set initial state after layout
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, headerOffset]);

  return activeSection;
};