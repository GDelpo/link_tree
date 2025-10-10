import React from 'react';

const MorphingAvatar = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-full p-1 rounded-full bg-gradient-to-br from-sky-600 to-slate-700 shadow-lg shadow-sky-600/10">
      <div
        className="
          w-full h-full
          bg-cover bg-center bg-no-repeat
          rounded-full
          avatar-morph
          shadow-[inset_0_0_0_9px_rgba(255,255,255,0.3)]  /* <-- AÑADIDO AQUÍ */
        "
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
};

export default MorphingAvatar;