import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routeConfig } from '@/config/routes';
import { buildMainNavItems } from '@/config/navigation';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import SimpleLayout from '@/layouts/SimpleLayout';

// Mapeo de strings → layouts reales
const layoutMap = {
  main: MainLayout,
  simple: SimpleLayout,
};

function App() {
  const mainNavItems = buildMainNavItems(routeConfig);

  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(
          routeConfig.reduce((acc, route) => {
            const { layout } = route;
            if (!acc[layout]) acc[layout] = [];
            acc[layout].push(route);
            return acc;
          }, {})
        ).map(([layoutKey, routes]) => {
          const Layout = layoutMap[layoutKey];
          return (
            <Route key={layoutKey} element={<Layout navItems={mainNavItems} />}>
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Route>
          );
        })}

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
