import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css'; // O la ruta a tus estilos

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
