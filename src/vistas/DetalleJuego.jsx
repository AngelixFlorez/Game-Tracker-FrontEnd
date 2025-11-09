// src/views/DetalleJuego.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerJuegoPorId } from '../servicios/JuegoServicio';
import { obtenerResenas } from '../servicios/ResenaServicio';
import { FaChevronLeft, FaStar, FaClock, FaLaptop } from 'react-icons/fa';
import FormularioReseña from '../componentes/FormularioResena';
import ListaResenas from '../componentes/ListaResenas';

// Componente para mostrar las estrellas en el detalle
const DetalleStarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <FaStar 
            key={index} 
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`} 
        />
    ));
    return <div className="flex items-center space-x-1">{stars}</div>;
};


const DetalleJuego = () => {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [reseñas, setReseñas] = useState([]);
    const [promedioPuntuacion, setPromedioPuntuacion] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // 1. Cargar reseñas y calcular promedio
    const cargarResenasYPromedio = useCallback(async () => {
        try {
            // Usa el filtro por juegoId que definimos en ResenaService
            const data = await obtenerResenas(id);
            setReseñas(data);

            if (data.length > 0) {
                const sumaPuntuaciones = data.reduce((sum, resena) => sum + resena.puntuacion, 0);
                setPromedioPuntuacion(sumaPuntuaciones / data.length);
            } else {
                setPromedioPuntuacion(null);
            }
        } catch (err) {
            console.error("Error al cargar reseñas:", err);
            // No establecemos error principal para que la vista del juego se muestre
        }
    }, [id]);

    // 2. Cargar datos del juego
    useEffect(() => {
        const cargarDatosJuego = async () => {
            setCargando(true);
            setError(null);
            try {
                const juegoData = await obtenerJuegoPorId(id);
                setJuego(juegoData);
                await cargarResenasYPromedio(); // Cargar reseñas después de obtener el juego
            } catch (err) {
                setError('No se pudo cargar el detalle del juego. Verifique que el ID sea correcto.');
                console.error(err);
            } finally {
                setCargando(false);
            }
        };

        cargarDatosJuego();
    }, [id, cargarResenasYPromedio]);


    if (cargando) {
        return <div className="text-center p-12 text-2xl font-semibold">Cargando detalles del juego...</div>;
    }

    if (error || !juego) {
        return <div className="container mx-auto p-8 text-red-700 bg-red-100 rounded-lg shadow-md mt-10">{error || 'Juego no encontrado.'}</div>;
    }
    
    // URL de la portada o placeholder
    const coverUrl = juego.imagenPortada || 'https://via.placeholder.com/400x600?text=Sin+Portada';

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Botón de regreso */}
            <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
                <FaChevronLeft className="mr-1" /> Volver a la Biblioteca
            </Link>

            {/* Sección Principal (Portada y Datos) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl mb-8 flex flex-col md:flex-row gap-8">
                
                {/* Columna Izquierda: Portada */}
                <div className="md:w-1/3 flex-shrink-0">
                    <img 
                        src={coverUrl} 
                        alt={`Portada de ${juego.titulo}`} 
                        className="w-full h-auto rounded-lg shadow-xl object-cover"
                        style={{ aspectRatio: '3/4' }}
                    />
                    <Link 
                        to={`/editar/${juego._id}`} 
                        className="mt-4 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Editar Información
                    </Link>
                </div>

                {/* Columna Derecha: Información Detallada */}
                <div className="md:w-2/3">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-2">{juego.titulo}</h1>
                    <p className="text-xl text-indigo-600 font-semibold mb-4">{juego.desarrollador} ({juego.añoLanzamiento})</p>
                    
                    {/* Metadatos y Puntuación */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 text-gray-700">
                            <FaLaptop className="text-purple-500" />
                            <span className="font-medium">{juego.plataforma}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                            <FaClock className="text-purple-500" />
                            <span className="font-medium">{juego.horasJugadas} hrs</span>
                        </div>
                        <div className="text-gray-700">
                            <span className={`font-medium px-3 py-1 rounded-full ${juego.completado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {juego.completado ? 'Completado' : 'Pendiente'}
                            </span>
                        </div>

                        {/* Puntuación Promedio */}
                        <div className="col-span-2 sm:col-span-3 flex items-center mt-2">
                            <span className="font-bold text-lg mr-2">Puntuación Promedio:</span>
                            {promedioPuntuacion !== null ? (
                                <div className="flex items-center">
                                    <DetalleStarRating rating={Math.round(promedioPuntuacion)} />
                                    <span className="ml-2 text-2xl font-bold text-yellow-600">
                                        {promedioPuntuacion.toFixed(1)}/5
                                    </span>
                                    <span className="ml-2 text-gray-500">({reseñas.length} reseñas)</span>
                                </div>
                            ) : (
                                <span className="text-gray-500 italic">Sin reseñas aún.</span>
                            )}
                        </div>
                    </div>
                    
                    {/* Descripción */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{juego.descripcion}</p>
                </div>
            </div>

            {/* Sección de Reseñas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna de Formulario */}
                <div className="lg:col-span-1">
                    <FormularioReseña 
                        juegoId={juego._id} 
                        onReviewSuccess={cargarResenasYPromedio} 
                    />
                </div>
                
                {/* Columna de Lista de Reseñas */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Reseñas de la Comunidad ({reseñas.length})
                    </h2>
                    <ListaResenas 
                        juegoId={juego._id} 
                        reseñas={reseñas} 
                        onReviewDeleted={cargarResenasYPromedio}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetalleJuego;