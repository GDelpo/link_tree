import React from 'react';
import { instagramPosts, youTubeVideos } from '@/data';
import InstagramCard from '@/components/InstagramCard';
import YouTubeCard from '@/components/YouTubeCard';
import SectionTitle from '@/components/SectionTitle';
import CardGrid from '@/components/CardGrid';
import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import PageHeader from '@/components/PageHeader';
import PageContainer from '@/components/PageContainer';

/**
 * Página "Redes" que muestra las últimas publicaciones de Instagram y YouTube.
 * Utiliza un diseño limpio y centrado para destacar el contenido visual.
 */
const Redes = () => {
  return (
    <>
      <PageHeader subtitle="Conectemos" title="Mis Redes Sociales" />
      <PageContainer>
        {/* --- SECCIÓN DE INSTAGRAM --- */}
        <div id="instagram" className="mb-12">
          <SectionTitle icon={SiInstagram}>Últimos Posts en Instagram</SectionTitle>
          <CardGrid
            items={instagramPosts}
            renderItem={(post) => <InstagramCard post={post} />}
          />
        </div>

        {/* --- SECCIÓN DE YOUTUBE --- */}
        <div id="youtube">
          <SectionTitle icon={SiYoutube}>Últimos Videos en YouTube</SectionTitle>
          <CardGrid
            items={youTubeVideos}
            renderItem={(video) => <YouTubeCard video={video} />}
          />
        </div>
      </PageContainer>
    </>
  );
};

export default Redes;