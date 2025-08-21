import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import SimpleLayout from './layouts/SimpleLayout';

// Pages
import Home from './pages/Home';
import Links from './pages/Links';
import About from './pages/About'; // 1. Importa la nueva página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas que usan el Layout Principal (con Sidebar) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> {/* 2. Añade la ruta */}
          {/* Puedes cambiar la ruta de /sobre-mi a /about en tu Sidebar.jsx */}
        </Route>

        {/* Rutas que usan el Layout Simple (con Navbar) */}
        <Route element={<SimpleLayout />}>
          <Route path="/links" element={<Links />} />
        </Route>

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;