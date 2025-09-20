import React, { memo } from 'react';

/**
 * Tarjeta contenedora con estilos consistentes (fondo, borde, sombra)
 * para agrupar contenido relacionado.
 */
const ContentCard = memo(({ children }) => (
  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6">
    {children}
  </div>
));

export default ContentCard;