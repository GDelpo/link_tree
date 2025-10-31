// src/services/youtubeService.js
import { apiClient } from './apiClient';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Obtiene los últimos videos de un canal de YouTube.
 * @param {number} maxResults - Número máximo de videos a retornar (por defecto 5).
 * @returns {Promise<Array<object>>} - Una promesa que resuelve con una lista de videos.
 */
export async function getLatestYouTubeVideos(maxResults = 5) {
  if (!YOUTUBE_API_KEY) {
    console.error(
      'YOUTUBE_API_KEY no está configurada en las variables de entorno.'
    );
    throw new Error('Falta la clave de API de YouTube.');
  }
  if (!YOUTUBE_CHANNEL_ID) {
    console.error(
      'YOUTUBE_CHANNEL_ID no está configurada en las variables de entorno.'
    );
    throw new Error('Falta el ID del canal de YouTube.');
  }

  const url = new URL(`${YOUTUBE_BASE_URL}/search`);
  url.searchParams.append('key', YOUTUBE_API_KEY);
  url.searchParams.append('channelId', YOUTUBE_CHANNEL_ID);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('order', 'date'); // Ordenar por fecha (más recientes primero)
  url.searchParams.append('type', 'video'); // Solo buscar videos
  url.searchParams.append('maxResults', maxResults.toString());

  try {
    const data = await apiClient(url.toString());
    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Error al obtener videos de YouTube:', error);
    throw error;
  }
}
