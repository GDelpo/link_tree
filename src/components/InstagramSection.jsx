import React, { useEffect, useState } from 'react';
import CardGrid from '@components/CardGrid';
import MediaCard from '@components/MediaCard';
import { ArrowRight } from 'lucide-react';
import { getInstagramPosts } from '@services/instagramService';
import { profileData } from '@content';

const INSTAGRAM_PROFILE_URL = profileData.socials?.find(social => social.name === 'Instagram')?.url || 'https://www.instagram.com/';

const InstagramSection = ({ limit = 3 }) => {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const posts = await getInstagramPosts(limit);
        const normalizedPosts = posts.map(post => ({
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
  }, [limit]);

  return (
    <div>
      {loading && <p className="text-center text-slate-600 dark:text-slate-300">Cargando posts de Instagram...</p>}
      {error && <p className="text-center text-red-500">Error al cargar posts de Instagram: {error.message}</p>}
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
  );
};

export default InstagramSection;
