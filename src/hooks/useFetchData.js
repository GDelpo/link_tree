import { useState, useEffect } from 'react';

/**
 * Hook simplificado para obtener datos de una API.
 * @param {Function} fetcherFunction - Función asíncrona que realiza la llamada a la API.
 * @returns {{ data: any, loading: boolean, error: Error | null, refetch: Function }}
 */
export function useFetchData(fetcherFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcherFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Solo ejecuta una vez al montar

  return { data, loading, error, refetch: fetchData };
}