import { useState, useEffect } from 'react';
import { getJuegos, createJuego, updateJuego, deleteJuego } from '../services/api.js';
import Modal from '../componentes/common/Modal.jsx';
import FormularioJuego from '../componentes/juego/FormularioJuego.jsx';
import ConfirmDialog from '../componentes/common/ConfirmDialog.jsx';

const GestionJuegos = () => {
    // Estados para lista de juegos, carga, modal, juego a editar, búsqueda y confirmación
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [juegoEditar, setJuegoEditar] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, juegoId: null });

    // Función para cargar todos los juegos desde el backend
    const cargarJuegos = async () => {
        setLoading(true);
        try {
            const res = await getJuegos();
            setJuegos(res.data);
        } catch (err) {
            alert('Error al cargar juegos');
        } finally {
            setLoading(false);
        }
    };

    // Cargar juegos al iniciar
    useEffect(() => {
        cargarJuegos();
    }, []);

    // Manejador para guardar (crear o actualizar) un juego
    const handleGuardar = async (data) => {
        try {
            if (juegoEditar) {
                // Si hay un juego seleccionado, actualizamos
                await updateJuego(juegoEditar._id, data);
            } else {
                // Si no, creamos uno nuevo
                await createJuego(data);
            }
            setModalOpen(false);
            setJuegoEditar(null);
            cargarJuegos(); // Recargar lista
        } catch (error) {
            alert('Error al guardar el juego');
        }
    };

    // Abrir diálogo de confirmación para eliminar
    const handleEliminar = (id) => {
        setConfirmDialog({ isOpen: true, juegoId: id });
    };

    // Ejecutar la eliminación del juego
    const confirmarEliminacion = async () => {
        const id = confirmDialog.juegoId;
        try {
            await deleteJuego(id);
            setJuegos(juegos.filter(j => j._id !== id)); // Actualizar estado local
        } catch (err) {
            console.error('Error al eliminar:', err);
            alert('Error al eliminar el juego');
        }
    };

    // Filtrar juegos por título
    const juegosFiltrados = juegos.filter(juego =>
        juego.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            {/* Encabezado y Botón de Agregar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-4xl font-bold text-white">Gestión de Juegos</h1>
                <button
                    onClick={() => {
                        setJuegoEditar(null); // Limpiar juego a editar para crear uno nuevo
                        setModalOpen(true);
                    }}
                    className="bg-[#e50914] text-white font-bold px-6 py-2 rounded-md hover:bg-[#f40612] transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Agregar Juego
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar juego por título..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#2f2f2f] bg-[#181818] text-white rounded-lg focus:outline-none focus:border-[#e50914] transition-colors"
                />
            </div>

            {/* Lista de juegos (Grid) */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e50914]"></div>
                </div>
            ) : juegosFiltrados.length === 0 ? (
                <p className="text-center text-[#b3b3b3] py-10">
                    {busqueda ? 'No se encontraron juegos con ese nombre.' : 'No hay juegos registrados.'}
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {juegosFiltrados.map((juego) => (
                        <div
                            key={juego._id}
                            className="bg-[#181818] rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-[#e50914] transition-all duration-300"
                        >
                            {/* Imagen de Portada */}
                            <div className="h-48 bg-[#2f2f2f] relative">
                                {juego.imagenPortada ? (
                                    <img
                                        src={juego.imagenPortada}
                                        alt={juego.titulo}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x400/2f2f2f/b3b3b3?text=Sin+Portada';
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-[#b3b3b3] text-sm">
                                        Sin portada
                                    </div>
                                )}
                            </div>

                            {/* Información del Juego */}
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-white truncate mb-2">{juego.titulo}</h3>
                                <p className="text-sm text-[#b3b3b3]">{juego.plataforma}</p>
                                <p className="text-xs text-[#808080] mt-1">
                                    {juego.genero} • {juego.añoLanzamiento || 'Año desconocido'}
                                </p>

                                {/* Etiquetas (Badges) */}
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {juego.enBiblioteca && (
                                        <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded">
                                            En Biblioteca
                                        </span>
                                    )}
                                    {juego.favorito && (
                                        <span className="px-2 py-1 bg-red-900/50 text-red-400 text-xs rounded">
                                            Favorito
                                        </span>
                                    )}
                                </div>

                                {/* Botones de Acción */}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => {
                                            setJuegoEditar(juego);
                                            setModalOpen(true);
                                        }}
                                        className="flex-1 bg-[#e50914] text-white px-3 py-2 rounded-md hover:bg-[#f40612] transition text-sm font-medium"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleEliminar(juego._id)}
                                        className="flex-1 bg-red-600/80 text-white px-3 py-2 rounded-md hover:bg-red-600 transition text-sm font-medium"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de formulario para Crear/Editar */}
            <Modal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setJuegoEditar(null);
                }}
                title={juegoEditar ? 'Editar Juego' : 'Agregar Nuevo Juego'}
            >
                <FormularioJuego juego={juegoEditar} onSuccess={handleGuardar} />
            </Modal>

            {/* Diálogo de confirmación de eliminación */}
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                onClose={() => setConfirmDialog({ isOpen: false, juegoId: null })}
                onConfirm={confirmarEliminacion}
                title="Eliminar Juego"
                message="¿Estás seguro de que quieres eliminar este juego? Esta acción no se puede deshacer y se eliminará de todas las bibliotecas."
            />
        </div>
    );
};

export default GestionJuegos;
