import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Hook para renderizar componentes en un portal fuera del árbol DOM normal
 * Útil para modales, tooltips, dropdowns que necesitan escapar de contenedores padre
 */
export const usePortal = (id = 'portal-root') => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    // Buscar contenedor existente o crearlo
    let portalContainer = document.getElementById(id);
    
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = id;
      portalContainer.style.position = 'relative';
      portalContainer.style.zIndex = '9999';
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);

    // Cleanup: remover contenedor vacío al desmontar
    return () => {
      if (portalContainer && portalContainer.children.length === 0) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [id]);

  return container;
};

/**
 * Componente Portal que renderiza children en un nodo DOM específico
 */
export const Portal = ({ children, id = 'portal-root' }) => {
  const container = usePortal(id);
  
  return container ? createPortal(children, container) : null;
};

export default Portal;