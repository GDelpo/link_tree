import React from 'react';
import PageHeader from '@components/layout/PageHeader';
import PageContainer from '@components/layout/PageContainer';
import InstagramSection from '@components/data/InstagramSection';
import SectionTitle from '@components/ui/SectionTitle';
import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';

const Redes = () => {
  return (
    <>
      <PageHeader subtitle='Conectemos' title='Mis Redes Sociales' />
      <PageContainer>
        {/* --- SECCIÓN DE INSTAGRAM --- */}
        <div id='instagram'>
          <SectionTitle icon={SiInstagram}>
            {'Últimos Posts en Instagram'}
          </SectionTitle>
          <p className='text-sm text-slate-500 dark:text-slate-400 -mt-2 mb-2 px-4 sm:px-0'>
            Explorá mis publicaciones recientes en Instagram. Para ver más
            contenido, visitá mi perfil.
          </p>
          <InstagramSection limit={6} />
        </div>
      </PageContainer>
    </>
  );
};

export default Redes;
