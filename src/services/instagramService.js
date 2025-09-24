// src/services/instagramService.js
import { apiClient } from './apiClient';

const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID; // Tu Instagram Business Account ID o Creator Account ID
const INSTAGRAM_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v18.0'; // Usa la versión estable más reciente

/**
 * Obtiene los últimos posts de Instagram.
 * Requiere un Access Token de larga duración y un ID de usuario de Instagram Business/Creator.
 * @param {number} limit - Número máximo de posts a retornar (por defecto 5).
 * @returns {Promise<Array<object>>} - Una promesa que resuelve con una lista de posts.
 */
export async function getInstagramPosts(limit = 5) {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.error("INSTAGRAM_ACCESS_TOKEN no está configurada en las variables de entorno.");
    throw new Error("Instagram Access Token is missing.");
  }
  if (!INSTAGRAM_USER_ID) {
    console.error("INSTAGRAM_USER_ID no está configurada en las variables de entorno.");
    throw new Error("Instagram User ID is missing.");
  }

  // Campos a recuperar para cada elemento multimedia. Ajusta según tus necesidades.
  const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username';

  const url = new URL(`${INSTAGRAM_GRAPH_API_BASE_URL}/${INSTAGRAM_USER_ID}/media`);
  url.searchParams.append('access_token', INSTAGRAM_ACCESS_TOKEN);
  url.searchParams.append('fields', fields);
  url.searchParams.append('limit', limit.toString());

  try {
    const data = await apiClient(url.toString());
    // La propiedad 'data' contiene el array de objetos multimedia
    return data.data.map(item => ({
      id: item.id,
      caption: item.caption,
      mediaType: item.media_type,
      mediaUrl: item.media_url,
      permalink: item.permalink,
      thumbnailUrl: item.thumbnail_url || item.media_url, // Usa media_url si thumbnail_url no está disponible
      timestamp: item.timestamp,
      username: item.username,
    }));
  } catch (error) {
    console.error("Error al obtener posts de Instagram:", error);
    throw error;
  }
}