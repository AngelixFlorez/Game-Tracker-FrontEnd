
import React from 'react';
import { FaClock, FaHeart, FaStar, FaTrash } from 'react-icons/fa';
import PuntuacionEstrellas from './PuntuacionEstrellas';
import { eliminarResena } from '../servicios/ResenaServicio';

const ResenaCard = ({ resena, onDelete }) => {
    
    // Función para formatear la fecha de creación
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200 hover:shadow-md transition-shadow duration-300">
            
            {/* Puntuación y Dificultad */}
            <div className="flex justify-between items-start mb-3 border-b pb-2">
                <div className="flex items-center space-x-2">
                    {/* Usa el componente de Estrellas solo para visualización */}
                    <PuntuacionEstrellas 
                        puntuacion={resena.puntuacion} 
                        isEditable={false} // No editable en la visualización
                    />
                    <span className="text-xl font-bold text-gray-800">
                        {resena.puntuacion}/5
                    </span>
                </div>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    resena.dificultad === 'Fácil' ? 'bg-green-200 text-green-800' :
                    resena.dificultad === 'Difícil' ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                }`}>
                    {resena.dificultad}
                </div>
            </div>

            {/* Texto de la Reseña */}
            <p className="text-gray-700 mb-4 italic leading-relaxed">
                "{resena.textoReseña}"
            </p>

            {/* Metadatos (Horas, Recomendación y Fecha) */}
            <div className="text-sm text-gray-500 border-t pt-3 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                        <FaClock className="mr-1 w-3 h-3" /> {resena.horasJugadas} horas
                    </span>
                    {resena.recomendaria && (
                        <span className="flex items-center text-pink-600 font-medium">
                            <FaHeart className="mr-1 w-3 h-3" /> ¡Recomendado!
                        </span>
                    )}
                </div>
                
                {/* Fecha y Botón de Eliminar */}
                <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                    <span className="text-xs">
                        Publicado: {formatDate(resena.createdAt)}
                    </span>
                    <button 
                        onClick={() => onDelete(resena._id)} 
                        className="text-red-500 hover:text-red-700 transition duration-200 p-1 rounded-full hover:bg-red-100"
                        title="Eliminar Reseña"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const ListaResenas = ({ juegoId, reseñas, onReviewDeleted }) => {
    
    // Lógica de eliminación de reseña
    const handleDelete = async (resenaId) => {
        if (window.confirm('¿Seguro que quieres eliminar esta reseña?')) {
            try {
                await eliminarResena(resenaId);
                // Si la eliminación es exitosa, llama al callback para recargar la lista
                onReviewDeleted();
            } catch (error) {
                alert('Error al eliminar la reseña.');
                console.error(error);
            }
        }
    };

    if (reseñas.length === 0) {
        return <p className="text-gray-500 text-lg italic text-center p-6 bg-white rounded-lg shadow-inner">
            Sé el primero en reseñar este juego.
        </p>
    }

    return (
        <div className="space-y-6">
            {reseñas.map((resena) => (
                // El campo "juego" que viene del backend está poblado (titulo y plataforma)
                <ResenaCard 
                    key={resena._id} 
                    resena={resena} 
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default ListaResenas;