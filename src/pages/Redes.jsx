import React, { useEffect, useState } from 'react';
import PageHeader from '@components/PageHeader';
import PageContainer from '@components/PageContainer';
import CardGrid from '@components/CardGrid';
import MediaCard from '@components/MediaCard';
import SectionTitle from '@components/SectionTitle';
import { ArrowRight } from 'lucide-react';
import { SiInstagram } from '@icons-pack/react-simple-icons';
import { getInstagramPosts } from '@services/instagramService';
import {profileData} from '@content';

const INSTAGRAM_PROFILE_URL = profileData.socials.find(social => social.name === 'Instagram')?.url || 'https://www.instagram.com/';
const INSTAGRAM_TITLE = 'Últimos Posts en Instagram';
const INSTAGRAM_DESCRIPTION = 'Explorá mis publicaciones recientes en Instagram. Para ver más contenido, visitá mi perfil.';

/**
 * Página "Redes" que muestra las últimas publicaciones de Instagram y YouTube.
 * Utiliza un diseño limpio y centrado para destacar el contenido visual.
 */
const Redes = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const posts = await getInstagramPosts();
        const normalizedPosts = posts.map((post) => ({
          id: post.id,
          permalink: post.permalink,
          thumbnail_url: post.imageUrl,
        }));
        setInstagramPosts(normalizedPosts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstagramPosts();
  }, []);

  return (
    <>
      <PageHeader subtitle="Conectemos" title="Mis Redes Sociales" />
      <PageContainer>
        {/* --- SECCIÓN DE INSTAGRAM --- */}
        <div id="instagram">
          <SectionTitle icon={SiInstagram}>{INSTAGRAM_TITLE}</SectionTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2 mb-2 px-4 sm:px-0">{INSTAGRAM_DESCRIPTION}</p>
          {loading && <p className="text-slate-600 dark:text-slate-300">Cargando posts de Instagram...</p>}
          {error && <p className="text-red-500">Error al cargar posts de Instagram: {error.message}</p>}
          {instagramPosts.length > 0 && (
            <CardGrid
              items={instagramPosts}
              renderItem={item => <MediaCard item={item} type="instagram" />}
              ariaLabel="Grilla de posts de Instagram"
            />
          )}
          {instagramPosts.length === 0 && !loading && !error && (
            <p className="text-center text-slate-600 dark:text-slate-300">No se encontraron posts de Instagram.</p>
          )}
          <div className="flex flex-col items-center gap-4 mt-8">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sky-700 dark:text-white bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg dark:shadow-black/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-sky-500 dark:focus:ring-offset-sky-800 transition-all duration-300"
            >
              Ver más en Instagram
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default Redes;