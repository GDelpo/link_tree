import React, { memo } from 'react';

/**
 * Componente genérico para renderizar una grilla de elementos.
 * Utiliza el patrón "render prop" para desacoplar la lógica de la grilla
 * de la lógica de renderizado de cada item individual.
 * @param {{ items: Array<{id: string | number}>, renderItem: (item: any) => React.ReactElement }} props
 */
const CardGrid = memo(({ items, renderItem }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
    {items.map((item) => {
      const element = renderItem(item);
      // Clona el elemento para inyectar la `key` requerida por React en las listas.
      return React.cloneElement(element, { key: item.id });
    })}
  </div>
));

export default CardGrid;