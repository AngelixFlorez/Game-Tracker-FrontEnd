import React, { useState, useEffect, useCallback } from 'react';
import TarjetaJuego from '../components/TarjetaJuego';
import { obtenerJuegos, eliminarJuego } from '../services/JuegoService';
import { obtenerResenas } from '../services/ResenaService'; 
import { Link } from 'react-router-dom';

const BibliotecaJuegos = () => {
    const [juegos, setJuegos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    // Estado para guardar las puntuaciones promedio { juegoId: promedio, ... }
    const [puntuaciones, setPuntuaciones] = useState({}); 

    // Función que calcula la puntuación promedio de todos los juegos
    const cargarPuntuaciones = useCallback(async (juegosData) => {
        try {
            // Obtiene TODAS las reseñas de la base de datos
            const todasResenas = await obtenerResenas();
            const nuevasPuntuaciones = {};
            
            juegosData.forEach(juego => {
                // Filtra solo las reseñas para el juego actual
                const resenasDelJuego = todasResenas.filter(r => r.juegoId === juego._id);
                
                if (resenasDelJuego.length > 0) {
                    const sumaPuntuaciones = resenasDelJuego.reduce((sum, resena) => sum + resena.puntuacion, 0);
                    nuevasPuntuaciones[juego._id] = sumaPuntuaciones / resenasDelJuego.length;
                } else {
                    nuevasPuntuaciones[juego._id] = null; // No hay reseñas, la puntuación es nula
                }
            });
            setPuntuaciones(nuevasPuntuaciones);

        } catch (error) {
            console.error("Error al cargar puntuaciones:", error);
            // Esto no debería bloquear la carga de juegos, solo da un mensaje en consola
        }
    }, []);


    // Función principal para cargar juegos y sus puntuaciones
    const cargarJuegos = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await obtenerJuegos();
            setJuegos(data);
            await cargarPuntuaciones(data); // Cargar puntuaciones después de cargar juegos
        } catch (err) {
            setError('Error al conectar con el servidor o cargar los juegos. ¿Está el backend corriendo?');
            console.error(err);
        } finally {
            setCargando(false);
        }
    }, [cargarPuntuaciones]); // Dependencia para que se reejecute si cambia la función

    // Ejecuta la carga inicial al montar el componente
    useEffect(() => {
        cargarJuegos();
    }, [cargarJuegos]);


    // Función para manejar la eliminación de un juego
    const handleEliminarJuego = async (id, titulo) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${titulo}" de tu biblioteca?`)) {
            try {
                // Llama al servicio de eliminación
                await eliminarJuego(id);
                // Si la eliminación fue exitosa, recargar la lista de juegos
                cargarJuegos(); 
            } catch (error) {
                alert('No se pudo eliminar el juego. Verifique la consola para más detalles.');
                console.error(error);
            }
        }
    };


    if (cargando) {
        return <div className="text-center p-8 text-xl font-semibold text-gray-700">Cargando tu GameTracker... ⏳</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                 <div className="text-center p-8 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
                    <p className="font-bold">Error de Conexión</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-300">
                <h1 className="text-3xl font-extrabold text-gray-800">
                    📚 Mi Biblioteca GameTracker (<span className="text-purple-600">{juegos.length}</span>)
                </h1>
                <Link 
                    to="/agregar"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
                >
                    + Agregar Nuevo Juego
                </Link>
            </header>

            {juegos.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                    <p className="text-gray-600 text-2xl font-light">
                        ¡Tu biblioteca está vacía! Empieza a agregar tus juegos favoritos.
                    </p>
                    <Link to="/agregar" className="mt-4 inline-block text-purple-600 hover:underline">
                        Ir al formulario de agregar juego
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {juegos.map((juego) => (
                        <TarjetaJuego 
                            key={juego._id} 
                            juego={juego} 
                            onDelete={handleEliminarJuego}
                            // Pasa el promedio de puntuación calculado
                            promedioPuntuacion={puntuaciones[juego._id]}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BibliotecaJuegos;