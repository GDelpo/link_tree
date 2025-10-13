// src/services/instagramService.js
import { apiClient } from './apiClient';

/**
 * Obtiene los detalles de los últimos posts de Instagram desde la API interna.
 * @param {number} limit - Número máximo de posts a retornar (por defecto 6).
 * @returns {Promise<Object[]>} - Una promesa que resuelve con los detalles de los posts.
 */
export async function getInstagramPosts(limit = 6) {
  try {
    const data = await apiClient(`/api/instagram?limit=${limit}`);
    return data;
  } catch (error) {
    console.error("Error al obtener los posts de Instagram:", error);
    throw error;
  }
}