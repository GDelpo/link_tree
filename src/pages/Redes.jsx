import React from 'react';
import MediaCard from '@components/MediaCard';
import { getLatestYouTubeVideos } from '@/services/youtubeService';
import { getInstagramPosts } from '@/services/instagramService';
import { useFetchData } from '@hooks/useFetchData';
import SectionTitle from '@components/SectionTitle';
import CardGrid from '@components/CardGrid';
import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import PageHeader from '@components/PageHeader';
import PageContainer from '@components/PageContainer';

/**
 * Página "Redes" que muestra las últimas publicaciones de Instagram y YouTube.
 * Utiliza un diseño limpio y centrado para destacar el contenido visual.
 */
const Redes = () => {
  // Usamos el hook useFetchData para obtener los videos de YouTube
  const { data: youtubeVideos, loading: youtubeLoading, error: youtubeError } = useFetchData(
    () => getLatestYouTubeVideos(6) // Puedes ajustar el número de videos
  );

  // Usamos el hook useFetchData para obtener los posts de Instagram
  const { data: instagramPosts, loading: instagramLoading, error: instagramError } = useFetchData(
    () => getInstagramPosts(6) // Puedes ajustar el número de posts
  );

  return (
    <>
      <PageHeader subtitle="Conectemos" title="Mis Redes Sociales" />
      <PageContainer>
        {/* --- SECCIÓN DE INSTAGRAM --- */}
        <div id="instagram" className="mb-12">
          <SectionTitle icon={SiInstagram}>Últimos Posts en Instagram</SectionTitle>
          {instagramLoading && <p className="text-center text-slate-600 dark:text-slate-300">Cargando posts de Instagram...</p>}
          {instagramError && <p className="text-center text-red-500">Error al cargar posts de Instagram: {instagramError.message}</p>}
          {instagramPosts && instagramPosts.length > 0 && (
            <CardGrid items={instagramPosts} renderItem={(post) => <MediaCard item={post} type="instagram" />} />
          )}
          {instagramPosts && instagramPosts.length === 0 && !instagramLoading && <p className="text-center text-slate-600 dark:text-slate-300">No se encontraron posts de Instagram.</p>}
        </div>

        {/* --- SECCIÓN DE YOUTUBE --- */}
        <div id="youtube">
          <SectionTitle icon={SiYoutube}>Últimos Videos en YouTube</SectionTitle>
          {youtubeLoading && <p className="text-center text-slate-600 dark:text-slate-300">Cargando videos de YouTube...</p>}
          {youtubeError && <p className="text-center text-red-500">Error al cargar videos de YouTube: {youtubeError.message}</p>}
          {youtubeVideos && youtubeVideos.length > 0 && (
            <CardGrid items={youtubeVideos} renderItem={(video) => <MediaCard item={video} type="youtube" />} />
          )}
          {youtubeVideos && youtubeVideos.length === 0 && !youtubeLoading && <p className="text-center text-slate-600 dark:text-slate-300">No se encontraron videos de YouTube.</p>}
        </div>
      </PageContainer>
    </>
  );
};

export default Redes;