import { useEffect, useState } from 'react';
import { getJuegos, getResenas } from '../services/api.js';

const EstadisticasPersonales = () => {
  // Estado para almacenar las estadísticas calculadas
  const [stats, setStats] = useState({
    totalJuegos: 0,
    completados: 0,
    horasTotales: 0,
    promedioPuntuacion: 0
  });

  // Efecto para cargar datos y calcular estadísticas al montar el componente
  useEffect(() => {
    const cargar = async () => {
      // Cargar juegos y reseñas en paralelo
      const [juegosRes, resenasRes] = await Promise.all([getJuegos(), getResenas()]);
      const todosJuegos = juegosRes.data;
      const resenas = resenasRes.data;

      // Filtrar solo juegos que están en la biblioteca del usuario
      const juegos = todosJuegos.filter(j => j.enBiblioteca === true);

      // Calcular juegos completados
      const completados = juegos.filter(j => j.estado === 'completado').length;

      // Calcular total de horas jugadas
      const horasTotales = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);

      // Calcular promedio de puntuación de las reseñas
      const promedio = resenas.length > 0
        ? (resenas.reduce((sum, r) => sum + r.puntuacion, 0) / resenas.length).toFixed(1)
        : 0;

      // Actualizar el estado con los valores calculados
      setStats({ totalJuegos: juegos.length, completados, horasTotales, promedioPuntuacion: promedio });
    };
    cargar();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Estadísticas Personales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjeta: Total de Juegos */}
        <div className="bg-[#181818] p-6 rounded-lg text-center border border-[#2f2f2f]">
          <h3 className="text-3xl font-bold text-[#e50914]">{stats.totalJuegos}</h3>
          <p className="text-[#b3b3b3] mt-2">Juegos en biblioteca</p>
        </div>
        {/* Tarjeta: Juegos Completados */}
        <div className="bg-[#181818] p-6 rounded-lg text-center border border-[#2f2f2f]">
          <h3 className="text-3xl font-bold text-green-500">{stats.completados}</h3>
          <p className="text-[#b3b3b3] mt-2">Completados</p>
        </div>
        {/* Tarjeta: Horas Totales */}
        <div className="bg-[#181818] p-6 rounded-lg text-center border border-[#2f2f2f]">
          <h3 className="text-3xl font-bold text-purple-500">{stats.horasTotales}</h3>
          <p className="text-[#b3b3b3] mt-2">Horas jugadas</p>
        </div>
        {/* Tarjeta: Puntuación Promedio */}
        <div className="bg-[#181818] p-6 rounded-lg text-center border border-[#2f2f2f]">
          <h3 className="text-3xl font-bold text-yellow-500">{stats.promedioPuntuacion}</h3>
          <p className="text-[#b3b3b3] mt-2">Puntuación promedio</p>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPersonales;