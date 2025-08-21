import React from 'react';
import UserProfileHeader from '../components/UserProfileHeader';
// Asumo que tienes un archivo de datos. Si no, reemplaza con tus datos.
import { profileData } from '../data/content';

const Home = () => {
  return (
    // Contenedor para centrar el perfil vertical y horizontalmente en el área de <main>
    <div className="min-h-screen flex items-center justify-center">
      {/* UserProfileHeader ya tiene su propio padding y layout interno */}
      <UserProfileHeader profileData={profileData} />
    </div>
  );
};

export default Home;