import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SimpleLayout = () => {
  // 1. Creamos un estado para guardar los links de navegación de la página activa
  const [navLinks, setNavLinks] = useState([]);

  return (
    <>
      {/* 2. Le pasamos los links que están en el estado a la Navbar */}
      <Navbar navLinks={navLinks} />
      <main>
        {/* 3. Pasamos la función `setNavLinks` a la página hija vía `context` */}
        <Outlet context={{ setNavLinks }} />
      </main>
    </>
  );
};

export default SimpleLayout;