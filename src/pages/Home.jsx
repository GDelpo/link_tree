import React from 'react';
import UserProfileHeader from '@components/data/UserProfileHeader';
import { profileData } from '@content';
import PageContainer from '@components/layout/PageContainer';

/**
 * Página de inicio que muestra la cabecera del perfil de usuario.
 */
const Home = () => {
  return (
    <PageContainer>
      <UserProfileHeader profileData={profileData} />
    </PageContainer>
  );
};

export default Home;
