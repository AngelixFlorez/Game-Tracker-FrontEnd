import { useState, useEffect } from 'react';
import { getJuegos } from '../services/api.js';

export const useJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getJuegos();
        setJuegos(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { juegos, loading, refetch: () => fetch() };
};