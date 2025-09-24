import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routeConfig } from '@/config/routes';

/**
 * Agrupa las rutas por el layout que utilizan.
 * @param {Array} routes - La configuración de rutas.
 * @returns {Map<React.Component, Array>} Un mapa donde las claves son los componentes de Layout
 * y los valores son arrays de las rutas que usan ese layout.
 */
const groupRoutesByLayout = (routes) => {
  const layoutMap = new Map();
  routes.forEach((route) => {
    const { layout } = route;
    if (!layoutMap.has(layout)) {
      layoutMap.set(layout, []);
    }
    layoutMap.get(layout).push(route);
  });
  return layoutMap;
};

function App() {
  const routesByLayout = groupRoutesByLayout(routeConfig);

  return (
    <BrowserRouter>
      <Routes>
        {Array.from(routesByLayout.entries()).map(([Layout, routes]) => (
          <Route key={Layout.name} element={<Layout />}>
            {routes.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Route>
        ))}

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;