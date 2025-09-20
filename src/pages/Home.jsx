import React from 'react';
import UserProfileHeader from '../components/UserProfileHeader';
import { profileData } from '../data/content';

/**
 * Página de inicio que muestra la cabecera del perfil de usuario.
 */
const Home = () => {
  return (
    <div className="flex justify-center">
      <UserProfileHeader profileData={profileData} />
    </div>
  );
};

export default Home;