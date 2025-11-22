import { useEffect, useState } from 'react';
import { getResenasPorJuego } from '../../services/api';

const DetalleJuegoModal = ({ juego, isOpen, onClose, onAgregarBiblioteca, onToggleFavorito, enBiblioteca }) => {
    // Estados para almacenar las reseñas y el estado de carga
    const [resenas, setResenas] = useState([]);
    const [loadingResenas, setLoadingResenas] = useState(false);

    // Efecto para cargar reseñas cuando se abre el modal con un juego seleccionado
    useEffect(() => {
        if (isOpen && juego) {
            cargarResenas();
        }
    }, [isOpen, juego]);

    // Función asíncrona para obtener las reseñas del backend
    const cargarResenas = async () => {
        if (!juego?._id) return;
        setLoadingResenas(true);
        try {
            const res = await getResenasPorJuego(juego._id);
            setResenas(res.data);
        } catch (err) {
            console.error('Error al cargar reseñas:', err);
        } finally {
            setLoadingResenas(false);
        }
    };

    // Si el modal no está abierto o no hay juego, no renderizar nada
    if (!isOpen || !juego) return null;

    // Calcular el promedio de calificación basado en las reseñas cargadas
    const calcularPromedioCalificacion = () => {
        if (resenas.length === 0) return 0;
        const suma = resenas.reduce((acc, r) => acc + r.puntuacion, 0);
        return (suma / resenas.length).toFixed(1);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[#181818] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer clic dentro del modal
            >
                {/* Hero Section con Imagen de Portada */}
                <div className="relative h-[400px] w-full">
                    <img
                        src={juego.imagenPortada}
                        alt={juego.titulo}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

                    {/* Botón Cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Título y Botones de Acción (Agregar a Biblioteca / Favorito) */}
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{juego.titulo}</h2>
                        <div className="flex gap-3">
                            {!enBiblioteca && onAgregarBiblioteca && (
                                <button
                                    onClick={() => onAgregarBiblioteca(juego)}
                                    className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Añadir a Mi Biblioteca
                                </button>
                            )}
                            {enBiblioteca && (
                                <span className="bg-green-600 text-white px-6 py-2 rounded font-bold flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    En Mi Biblioteca
                                </span>
                            )}

                            {/* Botón de Favorito */}
                            {onToggleFavorito && (
                                <button
                                    onClick={() => onToggleFavorito(juego)}
                                    className={`p-3 rounded-full transition-all ${juego.favorito
                                        ? 'bg-[#e50914] hover:bg-[#f40612]'
                                        : 'bg-[rgba(109,109,110,0.7)] hover:bg-[rgba(109,109,110,0.9)]'
                                        }`}
                                    title={juego.favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 text-white ${juego.favorito ? 'fill-current' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="p-8">
                    {/* Información Detallada del Juego */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Información</h3>
                            <div className="space-y-2 text-[#b3b3b3]">
                                <p><span className="text-white font-semibold">Género:</span> {juego.genero}</p>
                                <p><span className="text-white font-semibold">Plataforma:</span> {juego.plataforma}</p>
                                <p><span className="text-white font-semibold">Desarrollador:</span> {juego.desarrollador}</p>
                                <p><span className="text-white font-semibold">Año:</span> {juego.añoLanzamiento}</p>
                                {juego.horasJugadas > 0 && (
                                    <p><span className="text-white font-semibold">Horas jugadas:</span> {juego.horasJugadas}h</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Descripción</h3>
                            <p className="text-[#b3b3b3] leading-relaxed">{juego.descripcion}</p>
                        </div>
                    </div>

                    {/* Sección de Reseñas */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Reseñas</h3>
                            {resenas.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-white font-semibold">{calcularPromedioCalificacion()}/5</span>
                                    <span className="text-[#b3b3b3]">({resenas.length} reseñas)</span>
                                </div>
                            )}
                        </div>

                        {loadingResenas ? (
                            <p className="text-[#b3b3b3]">Cargando reseñas...</p>
                        ) : resenas.length === 0 ? (
                            <p className="text-[#b3b3b3]">No hay reseñas aún para este juego.</p>
                        ) : (
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {resenas.map((resena) => (
                                    <div key={resena._id} className="bg-[#2f2f2f] p-5 rounded-lg hover:bg-[#3a3a3a] transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            {/* Usuario y Fecha */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="w-10 h-10 rounded-full bg-[#e50914] flex items-center justify-center font-bold text-white">
                                                    {(resena.usuario || 'A')[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">{resena.usuario || 'Anónimo'}</h4>
                                                    <p className="text-[#b3b3b3] text-xs">
                                                        {new Date(resena.createdAt).toLocaleDateString('es-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Estrellas de Calificación */}
                                            <div className="flex items-center gap-1 ml-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`h-5 w-5 ${i < resena.puntuacion ? 'text-yellow-500' : 'text-gray-600'}`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Texto de la Reseña */}
                                        <p className="text-[#e5e5e5] leading-relaxed mb-3">{resena.textoReseña}</p>

                                        {/* Indicador de Recomendación */}
                                        <div className="flex items-center gap-2 pt-3 border-t border-[#404040]">
                                            {resena.recomendaria ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-green-500 font-semibold text-sm">Recomendado</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-red-500 font-semibold text-sm">No recomendado</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleJuegoModal;
