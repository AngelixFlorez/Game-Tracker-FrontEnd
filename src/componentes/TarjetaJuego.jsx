import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa'; 

// Componente helper para la Puntuación con Estrellas
const StarRating = ({ rating }) => {
    // Redondea la puntuación al entero más cercano (ej. 4.7 -> 5)
    const roundedRating = Math.round(rating);
    
    const stars = Array.from({ length: 5 }, (_, index) => (
        <FaStar 
            key={index} 
            // La estrella se pinta de amarillo si su índice es menor que la puntuación redondeada
            className={`w-4 h-4 ${index < roundedRating ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
    ));
    return <div className="flex items-center">{stars}</div>;
};

const TarjetaJuego = ({ juego, onDelete, promedioPuntuacion }) => {

    // Usa la imagenPortada del modelo o un placeholder
    const coverUrl = juego.imagenPortada || 'https://via.placeholder.com/300x400?text=Sin+Portada';
    
    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02]">
            {/* ENLACE a la vista DetalleJuego */}
            <Link to={`/juego/${juego._id}`}>
                <div className="relative h-64">
                    {/* Imagen de Portada */}
                    <img 
                        src={coverUrl} 
                        alt={`Portada de ${juego.titulo}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x400?text=Error+en+URL'; }}
                    />
                    
                    {/* Indicador de Completado (Requisito) */}
                    {juego.completado && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-lg">
                            <FaCheckCircle className="w-3 h-3 mr-1" />
                            Completado
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                {/* Título y Plataforma */}
                <h3 className="text-xl font-bold text-gray-800 truncate mb-1" title={juego.titulo}>
                    {juego.titulo}
                </h3>
                <p className="text-sm text-indigo-600 font-medium mb-3">
                    {juego.plataforma} | {juego.genero}
                </p>

                {/* Puntuación (Muestra el promedio si existe) */}
                {promedioPuntuacion !== null && promedioPuntuacion !== undefined && (
                    <div className="flex items-center mb-3">
                        <StarRating rating={promedioPuntuacion} />
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                            {promedioPuntuacion.toFixed(1)}/5
                        </span>
                    </div>
                )}
                
                {/* Horas Jugadas (Requisito) */}
                <p className="text-sm text-gray-500 mb-4">
                    ⏱️ **{juego.horasJugadas}** horas jugadas
                </p>

                {/* Botones de Acción */}
                <div className="flex justify-between space-x-2">
                    <Link 
                        to={`/editar/${juego._id}`}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-200 text-sm flex items-center justify-center"
                    >
                        <FaEdit className="mr-1" /> Editar
                    </Link>
                    <button
                        // Llama a la función onDelete pasada como prop
                        onClick={() => onDelete(juego._id, juego.titulo)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm flex items-center justify-center"
                    >
                        <FaTrash className="mr-1" /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TarjetaJuego;