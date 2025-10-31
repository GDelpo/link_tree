import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routeConfig, buildMainNavItems } from '@config';

// Layouts
import MainLayout from '@layouts/MainLayout';
import SimpleLayout from '@layouts/SimpleLayout';

// Loading components
import PageLoadingFallback from '@components/feedback/PageLoadingFallback';
import LazyErrorBoundary from '@components/feedback/LazyErrorBoundary';

// Contexts
import { LocationProvider } from '@contexts/LocationContext.jsx';

// Development components
import GeolocationDebugger from '@components/feedback/GeolocationDebugger.jsx';

function App() {
  const mainNavItems = buildMainNavItems(routeConfig);

  return (
    <LocationProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas con MainLayout */}
          <Route element={<MainLayout navItems={mainNavItems} />}>
            {routeConfig.main.map(({ path, component: Component, id }) => (
              <Route
                key={path}
                path={path}
                element={
                  <LazyErrorBoundary>
                    <Suspense fallback={<PageLoadingFallback pageName={id} />}>
                      <Component />
                    </Suspense>
                  </LazyErrorBoundary>
                }
              />
            ))}
          </Route>

          {/* Rutas con SimpleLayout */}
          <Route element={<SimpleLayout />}>
            {routeConfig.simple.map(({ path, component: Component, id }) => (
              <Route
                key={path}
                path={path}
                element={
                  <LazyErrorBoundary>
                    <Suspense fallback={<PageLoadingFallback pageName={id} />}>
                      <Component />
                    </Suspense>
                  </LazyErrorBoundary>
                }
              />
            ))}
          </Route>

          {/* Página 404 */}
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>

      {/* Development tools */}
      <GeolocationDebugger />
    </LocationProvider>
  );
}

export default App;
