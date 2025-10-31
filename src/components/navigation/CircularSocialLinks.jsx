import React from 'react';

const CircularSocialLinks = ({ links }) => {
  return (
    <div className='flex justify-center md:justify-start gap-3'>
      {links.map(({ name, url, Icon, hoverClass }) => (
        <a
          key={name}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={name}
          className={`
            w-11 h-11 bg-slate-200 dark:bg-slate-800 
            border border-slate-300 dark:border-slate-700 
            rounded-full flex items-center justify-center 
            text-slate-500 dark:text-slate-400 
            hover:text-white transition-all duration-300 transform hover:-translate-y-1
            ${hoverClass}
          `}
        >
          <Icon className='w-5 h-5' />
        </a>
      ))}
    </div>
  );
};

export default CircularSocialLinks;
