import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
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
        <InstagramGrid items={instagramPosts} />
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

// Inline simplificado de MediaCard + CardGrid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const InstagramGrid = memo(({ items }) => (
  <motion.div
    role="grid"
    aria-label="Grilla de posts de Instagram"
    aria-rowcount={Math.ceil(items.length / 3)}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
  >
    {items.map((item, index) => (
      <motion.div key={item.id} variants={itemVariants} role="gridcell" aria-colindex={(index % 3) + 1} aria-rowindex={Math.floor(index / 3) + 1}>
        <InstagramMediaCard item={item} />
      </motion.div>
    ))}
  </motion.div>
));

const InstagramMediaCard = ({ item, className = '' }) => {
  const imageUrl = item.thumbnail_url;
  const link = item.permalink;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1 w-full border-slate-200 dark:border-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/10 aspect-[3/4] ${className}`}
    >
      <div className="relative w-full h-full">
        <img src={imageUrl} alt="instagram" className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 transition-opacity duration-300 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100" />
      </div>
    </a>
  );
};
