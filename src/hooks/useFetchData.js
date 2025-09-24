import { useState, useEffect, useCallback } from 'react';

/**
 * Hook genérico para la obtención de datos de una API.
 * @param {Function} fetcherFunction - Una función asíncrona que realiza la llamada a la API y devuelve los datos.
 * @param {Array<any>} dependencies - Dependencias para re-ejecutar la función fetcher (similar a useEffect).
 * @returns {{ data: any, loading: boolean, error: Error | null, refetch: Function }}
 */
export function useFetchData(fetcherFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
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
  }, [fetcherFunction, ...dependencies]); // Incluye dependencias aquí para useCallback

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData en sí mismo está memoizado por useCallback

  return { data, loading, error, refetch: fetchData };
}