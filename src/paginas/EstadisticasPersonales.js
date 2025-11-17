import React, { useState, useEffect } from 'react';
// Asume que tienes funciones para obtener todos los juegos y todas las reseñas en tu API.
// import { getJuegos, getResenas } from '../services/api';

const EstadisticasPersonales = () => {
  const [stats, setStats] = useState({
    juegosCompletados: 0,
    horasTotales: 0,
    promedioPuntuacion: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        // Para un rendimiento óptimo, obtén los datos en paralelo.
        // Necesitarás implementar `getJuegos` y `getResenas` en tu `services/api.js`.
        // const [juegosResponse, resenasResponse] = await Promise.all([
        //   getJuegos(),
        //   getResenas(), 
        // ]);
        // const juegos = juegosResponse.data;
        // const resenas = resenasResponse.data;

        // --- Usando datos de ejemplo hasta que la API esté lista ---
        const juegos = [
          { _id: '1', completado: true, horasJugadas: 120 },
          { _id: '2', completado: false, horasJugadas: 45 },
          { _id: '3', completado: true, horasJugadas: 80 },
        ];
        const resenas = [
          { _id: 'r1', puntuacion: 5 },
          { _id: 'r2', puntuacion: 4 },
          { _id: 'r3', puntuacion: 3 },
        ];
        // --- Fin de datos de ejemplo ---

        // Cálculo de estadísticas
        const juegosCompletados = juegos.filter(juego => juego.completado).length;
        const horasTotales = juegos.reduce((acc, juego) => acc + juego.horasJugadas, 0);
        const totalPuntuacion = resenas.reduce((acc, resena) => acc + resena.puntuacion, 0);
        const promedioPuntuacion = resenas.length > 0 ? (totalPuntuacion / resenas.length).toFixed(1) : 0;

        setStats({ juegosCompletados, horasTotales, promedioPuntuacion });

      } catch (err) {
        setError('No se pudieron cargar las estadísticas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  if (loading) return <p className="text-center mt-8">Cargando estadísticas...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tus Estadísticas de Juego</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Juegos Completados</h2>
          <p className="text-4xl font-bold text-blue-500">{stats.juegosCompletados}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Horas Totales de Juego</h2>
          <p className="text-4xl font-bold text-green-500">{stats.horasTotales}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Puntuación Promedio</h2>
          <p className="text-4xl font-bold text-yellow-500">{stats.promedioPuntuacion} ⭐</p>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPersonales;