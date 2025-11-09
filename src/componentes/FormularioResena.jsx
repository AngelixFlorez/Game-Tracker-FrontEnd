
import React, { useState } from 'react';
import PuntuacionEstrellas from './PuntuacionEstrellas';
import { crearResena } from '../servicios/ResenaServicio'; 

// Opciones para el campo 'dificultad'
const dificultades = ['Fácil', 'Normal', 'Difícil'];

const FormularioReseña = ({ juegoId, onReviewSuccess }) => {
    
    const [formData, setFormData] = useState({
        juegoId: juegoId,
        puntuacion: 0,
        textoReseña: '',
        horasJugadas: 0,
        dificultad: 'Normal',
        recomendaria: true
    });

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    // Manejo de cambios en inputs (texto, número, select)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    // Manejo de la puntuación (usado por el componente PuntuacionEstrellas)
    const handlePuntuacionChange = (puntuacion) => {
        setFormData(prev => ({ ...prev, puntuacion }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError(null);

        if (formData.puntuacion === 0) {
            setError('Debes seleccionar una puntuación con estrellas.');
            setCargando(false);
            return;
        }

        try {
            // Llama al servicio de creación de reseña
            await crearResena(formData);
            
            // Llama a la función de éxito para recargar las reseñas en la vista principal
            onReviewSuccess();
            
            // Limpia el formulario
            setFormData({
                juegoId: juegoId,
                puntuacion: 0,
                textoReseña: '',
                horasJugadas: 0,
                dificultad: 'Normal',
                recomendaria: true
            });

        } catch (err) {
            const errorMsg = err.details || 'Error al guardar la reseña. Verifique el servidor.';
            setError(errorMsg);
            console.error(err);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Escribe tu Reseña</h3>
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 text-sm" role="alert">
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Puntuación con Estrellas */}
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <label className="text-lg font-semibold text-gray-700">Puntuación (1-5 Estrellas) *</label>
                    <PuntuacionEstrellas 
                        puntuacion={formData.puntuacion} 
                        setPuntuacion={handlePuntuacionChange} 
                    />
                </div>

                {/* Texto de la Reseña */}
                <div>
                    <label htmlFor="textoReseña" className="block text-sm font-semibold text-gray-700 mb-1">Tu opinión detallada *</label>
                    <textarea
                        id="textoReseña"
                        name="textoReseña"
                        value={formData.textoReseña}
                        onChange={handleChange}
                        rows="4"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 resize-none"
                    ></textarea>
                </div>

                {/* Horas, Dificultad y Recomendaría */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Horas Jugadas */}
                    <div>
                        <label htmlFor="horasJugadas" className="block text-sm font-semibold text-gray-700 mb-1">Horas Jugadas</label>
                        <input
                            type="number"
                            id="horasJugadas"
                            name="horasJugadas"
                            value={formData.horasJugadas}
                            onChange={handleChange}
                            min="0"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    {/* Dificultad */}
                    <div>
                        <label htmlFor="dificultad" className="block text-sm font-semibold text-gray-700 mb-1">Dificultad Percibida</label>
                        <select
                            id="dificultad"
                            name="dificultad"
                            value={formData.dificultad}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-purple-500 focus:border-purple-500 appearance-none"
                        >
                            {dificultades.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    {/* Recomendaría */}
                    <div className="flex items-center pt-5">
                        <input 
                            type="checkbox" 
                            name="recomendaria" 
                            checked={formData.recomendaria} 
                            onChange={handleChange} 
                            id="recomendaria"
                            className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="recomendaria" className="ml-2 text-sm font-medium text-gray-700">
                            Lo recomendaría
                        </label>
                    </div>
                </div>

                {/* Botón de Enviar */}
                <button
                    type="submit"
                    disabled={cargando}
                    className={`w-full py-3 text-white font-bold rounded-lg transition duration-300 ${cargando ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700 shadow-lg'}`}
                >
                    {cargando ? 'Guardando Reseña...' : 'Publicar Reseña'}
                </button>
            </form>
        </div>
    );
};

export default FormularioReseña;