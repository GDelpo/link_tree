import React, { createContext, useContext } from "react";

/**
 * Contexto para manejar los enlaces de navegación dinámicos en SimpleLayout.
 */
const LayoutContext = createContext();

/**
 * Provider que envuelve a los hijos y expone `setNavLinks`.
 * @param {{ value: { setNavLinks: React.Dispatch<React.SetStateAction<any>> }, children: React.ReactNode }} props
 */
export const LayoutContextProvider = ({ value, children }) => {
  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

/**
 * Hook para consumir el contexto.
 * Lanza un error si se usa fuera de LayoutContextProvider.
 */
export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "useLayoutContext debe usarse dentro de un LayoutContextProvider"
    );
  }
  return context;
};
