import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const ProfileInfo = ({ name, titles, description }) => {
  const [text] = useTypewriter({
    words: titles || [''],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <div>
      <h1 
        id="profile-heading"
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-sky-700 dark:from-white dark:to-sky-400"
      >
        {name}
      </h1>
      <h2 className="text-lg text-slate-600 dark:text-slate-300 mb-6 font-medium h-7">
        <span>{text}</span>
        <Cursor cursorColor='currentColor' cursorClassName="text-sky-500" />
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-xl">
        {description}
      </p>
    </div>
  );
};

export default ProfileInfo;