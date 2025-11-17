
import React, { useState, useEffect } from 'react';
import { obtenerJuegos } from '../servicios/JuegoServicio';
import { FaTrophy, FaHourglassHalf, FaGamepad, FaChartPie, FaCheckCircle } from 'react-icons/fa';

// Componente helper para mostrar una estadística clave
const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-b-4 ${color} flex items-center justify-between`}>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <Icon className={`w-8 h-8 opacity-50`} />
    </div>
);

const EstadisticasPersonales = () => {
    const [stats, setStats] = useState({
        totalJuegos: 0,
        juegosCompletados: 0,
        totalHoras: 0,
        promedioHoras: 0,
        plataformaFavorita: 'N/A',
    });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const calcularEstadisticas = async () => {
            setCargando(true);
            setError(null);
            try {
                const juegos = await obtenerJuegos();
                
                // 1. Cálculos generales
                const totalJuegos = juegos.length;
                const juegosCompletados = juegos.filter(j => j.completado).length;
                const totalHoras = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);
                const promedioHoras = totalJuegos > 0 ? (totalHoras / totalJuegos).toFixed(1) : 0;

                // 2. Plataforma Favorita (Cálculo simple: la más frecuente)
                const plataformaMap = juegos.reduce((acc, j) => {
                    acc[j.plataforma] = (acc[j.plataforma] || 0) + 1;
                    return acc;
                }, {});
                
                let plataformaFavorita = 'N/A';
                let maxCount = 0;
                
                for (const plataforma in plataformaMap) {
                    if (plataformaMap[plataforma] > maxCount) {
                        maxCount = plataformaMap[plataforma];
                        plataformaFavorita = plataforma;
                    }
                }

                setStats({
                    totalJuegos,
                    juegosCompletados,
                    totalHoras: totalHoras.toLocaleString(), // Formato con comas
                    promedioHoras,
                    plataformaFavorita: maxCount > 0 ? `${plataformaFavorita} (${maxCount})` : 'N/A',
                });
            } catch (err) {
                setError('Error al cargar datos. Asegúrate de que el Backend esté en funcionamiento.');
                console.error(err);
            } finally {
                setCargando(false);
            }
        };

        calcularEstadisticas();
    }, []);

    if (cargando) {
        return <div className="text-center p-12 text-2xl font-semibold">Calculando estadísticas... 📊</div>;
    }

    if (error) {
        return <div className="container mx-auto p-8 text-red-700 bg-red-100 rounded-lg shadow-md mt-10">{error}</div>;
    }

    if (stats.totalJuegos === 0) {
        return <div className="text-center p-12 text-2xl font-semibold text-gray-500">Aún no hay juegos para generar estadísticas. ¡Agrega algunos!</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-4">
                📈 Dashboard de Estadísticas Personales
            </h1>

            {/* Grid de Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    icon={FaGamepad} 
                    title="Total de Juegos" 
                    value={stats.totalJuegos} 
                    color="border-purple-500"
                />
                <StatCard 
                    icon={FaCheckCircle} 
                    title="Juegos Completados" 
                    value={`${stats.juegosCompletados} (${((stats.juegosCompletados / stats.totalJuegos) * 100).toFixed(0)}%)`} 
                    color="border-green-500"
                />
                <StatCard 
                    icon={FaHourglassHalf} 
                    title="Horas Totales Jugadas" 
                    value={`${stats.totalHoras} hrs`} 
                    color="border-yellow-500"
                />
                <StatCard 
                    icon={FaTrophy} 
                    title="Plataforma Favorita" 
                    value={stats.plataformaFavorita} 
                    color="border-blue-500"
                />
            </div>

            {/* Sección de Resumen o Gráficos (Opcional, se puede expandir) */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaChartPie className="mr-2 text-purple-600" /> Resumen y Análisis
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    Tu promedio de tiempo de juego por título es de **{stats.promedioHoras} horas**. 
                    Sigue añadiendo juegos y reseñas para obtener datos más precisos.
                </p>
                {/* Aquí se podrían añadir componentes de gráficos (usando Chart.js, Recharts, etc.) */}
            </div>
        </div>
    );
};

export default EstadisticasPersonales;