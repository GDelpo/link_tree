import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para renderizar un encabezado de página estandarizado.
 * @param {{
 *   subtitle: string,
 *   title: string,
 *   className?: string
 * }} props
 */
const PageHeader = ({
  subtitle,
  title,
  className = 'text-center pt-16 pb-12',
}) => {
  return (
    <div className={className}>
      <div className='max-w-4xl mx-auto px-4'>
        {subtitle && (
          <p className='text-sm uppercase text-white/80 tracking-widest'>
            {subtitle}
          </p>
        )}
        {title && (
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mt-2 break-words'>
            {title}
          </h1>
        )}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default PageHeader;
