import { useRef } from 'react';

/**
 * Hook para mejorar la accesibilidad de focus en componentes
 */
export const useFocusManagement = () => {
  const lastFocusedElement = useRef(null);

  /**
   * Guarda el elemento actualmente enfocado
   */
  const saveFocus = () => {
    lastFocusedElement.current = document.activeElement;
  };

  /**
   * Restaura el focus al elemento previamente guardado
   */
  const restoreFocus = () => {
    if (lastFocusedElement.current && typeof lastFocusedElement.current.focus === 'function') {
      lastFocusedElement.current.focus();
    }
  };

  /**
   * Atrapa el focus dentro de un contenedor específico
   */
  const trapFocus = (containerRef) => {
    if (!containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    containerRef.current.addEventListener('keydown', handleTabKey);
    
    // Focus el primer elemento al abrir
    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('keydown', handleTabKey);
      }
    };
  };

  return { saveFocus, restoreFocus, trapFocus };
};

/**
 * Hook para manejar navegación con teclado en listas
 */
export const useKeyboardNavigation = (items, onSelect) => {
  const currentIndex = useRef(-1);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        currentIndex.current = Math.min(currentIndex.current + 1, items.length - 1);
        focusItem(currentIndex.current);
        break;
      case 'ArrowUp':
        e.preventDefault();
        currentIndex.current = Math.max(currentIndex.current - 1, 0);
        focusItem(currentIndex.current);
        break;
      case 'Home':
        e.preventDefault();
        currentIndex.current = 0;
        focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        currentIndex.current = items.length - 1;
        focusItem(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (currentIndex.current >= 0 && onSelect) {
          onSelect(items[currentIndex.current]);
        }
        break;
    }
  };

  const focusItem = (index) => {
    const item = document.querySelector(`[data-nav-index="${index}"]`);
    if (item) {
      item.focus();
    }
  };

  return { handleKeyDown, currentIndex };
};

/**
 * Hook para anunciar cambios a screen readers
 */
export const useScreenReader = () => {
  const announce = (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remover después de que el screen reader lo lea
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  return { announce };
};