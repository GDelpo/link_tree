import { useEffect } from 'react';

/**
 * Hook para cambiar dinámicamente el title del documento
 * @param {string} title - El título que se quiere establecer
 * @param {string} [suffix] - Sufijo opcional (ej: "| Juan Cruz Arbelais")
 */
export const useDocumentTitle = (title, suffix = '| Juan Cruz Arbelais') => {
  useEffect(() => {
    const fullTitle = title ? `${title} ${suffix}` : 'Juan Cruz Arbelais';
    document.title = fullTitle;

    // Cleanup: restaurar título por defecto cuando el componente se desmonta
    return () => {
      document.title = 'Juan Cruz Arbelais';
    };
  }, [title, suffix]);
};

export default useDocumentTitle;
