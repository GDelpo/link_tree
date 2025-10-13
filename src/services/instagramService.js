// src/services/instagramService.js
import { apiClient } from './apiClient';

const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_GRAPH_API_BASE_URL = 'https://graph.instagram.com/';

/**
 * Obtiene el ID de usuario de Instagram asociado al token de acceso.
 * @returns {Promise<string>} - Una promesa que resuelve con el ID de usuario de Instagram.
 */
async function getInstagramUserId() {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.error("INSTAGRAM_ACCESS_TOKEN no está configurada en las variables de entorno.");
    throw new Error("Falta el token de acceso de Instagram.");
  }

  const url = new URL(`${INSTAGRAM_GRAPH_API_BASE_URL}/me`);
  url.searchParams.append('access_token', INSTAGRAM_ACCESS_TOKEN);

  try {
    const data = await apiClient(url.toString());
    return data.id; // Retorna el ID de usuario
  } catch (error) {
    console.error("Error al obtener el ID de usuario de Instagram:", error);
    throw error;
  }
}


/**
 * Obtiene los datos crudos de los posts de Instagram para un usuario específico.
 * @param {string} userId - El ID del usuario de Instagram.
 * @param {number} limit - Número máximo de posts a retornar (por defecto 5).
 * @returns {Promise<Object[]>} - Una promesa que resuelve con los datos crudos de los posts.
 */
async function getInstagramPostsIds(userId, limit) {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.error("INSTAGRAM_ACCESS_TOKEN no está configurada en las variables de entorno.");
    throw new Error("Falta el token de acceso de Instagram.");
  }

  const url = new URL(`${INSTAGRAM_GRAPH_API_BASE_URL}/${userId}/media`);
  url.searchParams.append('access_token', INSTAGRAM_ACCESS_TOKEN);
  url.searchParams.append('limit', limit.toString());

  try {
    const data = await apiClient(url.toString());
    return data.data;
  } catch (error) {
    console.error("Error al obtener los datos crudos de Instagram:", error);
    throw error;
  }
}

/**
 * Obtiene los datos detallados de un post de Instagram dado su ID.
 * @param {string} postId - El ID del post de Instagram.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos del post.
 */
async function getInstagramPostDetails(postId) {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.error("INSTAGRAM_ACCESS_TOKEN no está configurada en las variables de entorno.");
    throw new Error("Falta el token de acceso de Instagram.");
  }

  // Pedimos los campos relevantes para todos los tipos
  const url = new URL(`${INSTAGRAM_GRAPH_API_BASE_URL}/${postId}`);
  url.searchParams.append('access_token', INSTAGRAM_ACCESS_TOKEN);
  url.searchParams.append('fields', 'permalink,thumbnail_url,media_url,media_type');

  try {
    const data = await apiClient(url.toString());
    // Si es VIDEO y tiene thumbnail_url, lo usamos. Si no, usamos media_url.
    let imageUrl = data.media_url;
    if (data.media_type === 'VIDEO' && data.thumbnail_url) {
      imageUrl = data.thumbnail_url;
    }
    // Si es IMAGE o CAROUSEL_ALBUM, usamos media_url
    return {
      id: postId,
      permalink: data.permalink,
      imageUrl,
      mediaType: data.media_type,
    };
  } catch (error) {
    console.error(`Error al obtener los detalles del post con ID ${postId}:`, error);
    throw error;
  }
}

/**
 * Punto de entrada principal: Obtiene los detalles de los últimos posts de Instagram del usuario actual.
 * @param {number} limit - Número máximo de posts a retornar (por defecto 5).
 * @returns {Promise<Object[]>} - Una promesa que resuelve con los detalles de los posts.
 */
export async function getInstagramPosts(limit = 6) {
  try {
    const userId = await getInstagramUserId();
    const postIds = await getInstagramPostsIds(userId, limit);
    // Filtramos los posts que tengan media_url o thumbnail_url
    const postDetails = await Promise.all(
      postIds.map(async (post) => {
        const details = await getInstagramPostDetails(post.id);
        // Solo incluimos si tiene imageUrl y permalink
        if (details.imageUrl && details.permalink) {
          return details;
        }
        return null;
      })
    );
    // Filtramos los nulos
    return postDetails.filter(Boolean);
  } catch (error) {
    console.error("Error al obtener los posts de Instagram:", error);
    throw error;
  }
}