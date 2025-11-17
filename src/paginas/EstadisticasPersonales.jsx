import { useEffect, useState } from 'react';
import { getJuegos, getResenas } from '../services/api.js';

const EstadisticasPersonales = () => {
  const [stats, setStats] = useState({
    totalJuegos: 0,
    completados: 0,
    horasTotales: 0,
    promedioPuntuacion: 0
  });

  useEffect(() => {
    const cargar = async () => {
      const [juegosRes, resenasRes] = await Promise.all([getJuegos(), getResenas()]);
      const juegos = juegosRes.data;
      const resenas = resenasRes.data;

      const completados = juegos.filter(j => j.completado).length;
      const horasTotales = juegos.reduce((sum, j) => sum + j.horasJugadas, 0);
      const promedio = resenas.length > 0
        ? (resenas.reduce((sum, r) => sum + r.puntuacion, 0) / resenas.length).toFixed(1)
        : 0;

      setStats({ totalJuegos: juegos.length, completados, horasTotales, promedioPuntuacion: promedio });
    };
    cargar();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Estadísticas Personales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <h3 className="text-2xl font-bold">{stats.totalJuegos}</h3>
          <p>Juegos en biblioteca</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <h3 className="text-2xl font-bold">{stats.completados}</h3>
          <p>Completados</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg text-center">
          <h3 className="text-2xl font-bold">{stats.horasTotales}</h3>
          <p>Horas jugadas</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center">
          <h3 className="text-2xl font-bold">{stats.promedioPuntuacion}</h3>
          <p>Puntuación promedio</p>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPersonales;