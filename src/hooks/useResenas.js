import { useState, useEffect } from 'react';
import { getResenas } from '../services/api';

export const useResenas = (juegoId) => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getResenas(juegoId);
        setResenas(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [juegoId]);

  return { resenas, loading };
};