// src/services/apiClient.js

/**
 * Configuración base para el cliente API.
 * Se puede extender para incluir headers comunes, interceptores, etc.
 */
const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Función genérica para realizar llamadas a la API.
 * @param {string} url - La URL completa del endpoint.
 * @param {object} options - Opciones para la llamada fetch (method, headers, body, etc.).
 * @returns {Promise<object>} - Una promesa que resuelve con los datos JSON de la respuesta.
 * @throws {Error} - Lanza un error si la respuesta no es exitosa o hay un problema de red.
 */
export async function apiClient(url, options = {}) {
  const config = {
    ...API_CONFIG,
    ...options,
    headers: { ...API_CONFIG.headers, ...options.headers },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        `API Error: ${response.status} - ${errorData.message || 'Unknown error'}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la llamada a la API:', error);
    throw error; // Re-lanza el error para que el componente o hook que llama lo maneje
  }
}
