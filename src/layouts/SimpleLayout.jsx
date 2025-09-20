import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { LayoutContextProvider } from '@/contexts/LayoutContext.jsx';

/**
 * Layout simple que consiste en una barra de navegación superior y el contenido de la página.
 * Utiliza el contexto de Outlet para permitir que las páginas hijas (ej. Links.jsx)
 * establezcan los enlaces que se mostrarán en la Navbar.
 */
const SimpleLayout = () => {
  // Almacena los enlaces de navegación que la página actual desea mostrar en la Navbar.
  const [navLinks, setNavLinks] = useState([]);

  return (
    // Proveemos el valor `setNavLinks` a todos los componentes hijos.
    <LayoutContextProvider value={{ setNavLinks }}>
      <>
        <Navbar navLinks={navLinks} />
        <main className="pt-16 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </>
    </LayoutContextProvider>
  );
};

export default SimpleLayout;