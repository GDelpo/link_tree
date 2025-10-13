import React from 'react';
import PageHeader from '@components/PageHeader';
import PageContainer from '@components/PageContainer';
import InstagramSection from '@components/InstagramSection';

const Redes = () => {
  return (
    <>
      <PageHeader subtitle="Conectemos" title="Mis Redes Sociales" />
      <PageContainer>
        {/* --- SECCIÓN DE INSTAGRAM --- */}
        <div id="instagram">
          <InstagramSection limit={6} />
        </div>
      </PageContainer>
    </>
  );
};

export default Redes;