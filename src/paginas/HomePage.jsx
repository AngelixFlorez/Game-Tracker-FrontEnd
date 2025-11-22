import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getJuegos, updateJuego } from '../services/api';
import DetalleJuegoModal from '../componentes/juego/DetalleJuegoModal';

const HomePage = () => {
    // Estados para manejar la lista de juegos, carga, modal y búsqueda
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    // Referencias para los contenedores de scroll horizontal
    const tendenciasRef = useRef(null);
    const favoritosRef = useRef(null);
    // Estados para controlar la visibilidad de los botones de scroll
    const [mostrarBotonTendencias, setMostrarBotonTendencias] = useState(false);
    const [mostrarBotonFavoritos, setMostrarBotonFavoritos] = useState(false);

    // Efecto para cargar los juegos al montar el componente
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await getJuegos();
                setJuegos(res.data);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    // Efecto para verificar si es necesario mostrar botones de scroll
    useEffect(() => {
        const checkScroll = (ref, setMostrar) => {
            if (ref.current) {
                const { scrollWidth, clientWidth } = ref.current;
                setMostrar(scrollWidth > clientWidth);
            }
        };

        checkScroll(tendenciasRef, setMostrarBotonTendencias);
        checkScroll(favoritosRef, setMostrarBotonFavoritos);

        const handleResize = () => {
            checkScroll(tendenciasRef, setMostrarBotonTendencias);
            checkScroll(favoritosRef, setMostrarBotonFavoritos);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [juegos]);

    // Función para manejar el scroll horizontal de las listas
    const scrollHorizontal = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 400;
            const container = ref.current;
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (direction === 'right') {
                if (container.scrollLeft + scrollAmount >= maxScroll) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                if (container.scrollLeft <= 0) {
                    container.scrollTo({ left: maxScroll, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        }
    };

    // Manejador para agregar un juego a la biblioteca del usuario
    const handleAgregarBiblioteca = async (juego) => {
        try {
            await updateJuego(juego._id, { ...juego, enBiblioteca: true });
            setJuegos(juegos.map(j =>
                j._id === juego._id ? { ...j, enBiblioteca: true } : j
            ));
            setModalOpen(false);
            alert('¡Juego agregado a tu biblioteca!');
        } catch (error) {
            console.error('Error al agregar a biblioteca:', error);
            alert('Error al agregar el juego a la biblioteca');
        }
    };

    // Manejador para marcar/desmarcar un juego como favorito
    const handleToggleFavorito = async (juego) => {
        try {
            const nuevoEstado = !juego.favorito;
            setJuegos(juegos.map(j =>
                j._id === juego._id ? { ...j, favorito: nuevoEstado } : j
            ));
            if (juegoSeleccionado?._id === juego._id) {
                setJuegoSeleccionado({ ...juegoSeleccionado, favorito: nuevoEstado });
            }
            await updateJuego(juego._id, { ...juego, favorito: nuevoEstado });
        } catch (error) {
            console.error('Error al actualizar favorito:', error);
            setJuegos(juegos.map(j =>
                j._id === juego._id ? { ...j, favorito: !nuevoEstado } : j
            ));
            alert('Error al actualizar favoritos');
        }
    };

    // Abrir el modal con los detalles del juego seleccionado
    const abrirModal = (juego) => {
        setJuegoSeleccionado(juego);
        setModalOpen(true);
    };

    // Filtrar juegos basado en la búsqueda
    const juegosFiltrados = busqueda
        ? juegos.filter(j => j.titulo.toLowerCase().includes(busqueda.toLowerCase()))
        : juegos;

    const favoritos = juegosFiltrados.filter(j => j.favorito);
    const tendencias = juegosFiltrados.slice(0, 10); // Mostrar solo los primeros 10 como tendencias

    return (
        <div className="min-h-screen bg-[#141414] text-white">
            {/* Sección Hero (Banner Principal) */}
            <div className="relative h-[80vh] w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full md:w-1/2">
                    <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">Game Tracker</h1>
                    <p className="text-lg mb-6 drop-shadow-md">
                        Organiza tu colección de videojuegos, rastrea tu progreso y comparte tus reseñas con el mundo.
                        La forma definitiva de gestionar tu vida gamer.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/biblioteca" className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ir a mi Biblioteca
                        </Link>
                        <Link to="/estadisticas" className="bg-[rgba(109,109,110,0.7)] text-white px-8 py-3 rounded font-bold hover:bg-[rgba(109,109,110,0.4)] transition flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ver Estadísticas
                        </Link>
                    </div>
                </div>
            </div>

            {/* Secciones de Contenido */}
            <div className="px-10 py-8 space-y-12">
                {/* Barra de búsqueda */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar juegos..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full px-6 py-4 pl-14 bg-[#181818] text-white rounded-lg border-2 border-[#2f2f2f] focus:outline-none focus:border-[#e50914] transition-all duration-300 text-lg"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b3b3b3] absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Sección: Tendencias Ahora */}
                <section className="relative">
                    <h2 className="text-2xl font-bold mb-4 text-[#e5e5e5] hover:text-white transition cursor-pointer">Tendencias Ahora</h2>
                    <div className="relative group">
                        <div
                            ref={tendenciasRef}
                            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
                        >
                            {tendencias.length > 0 ? tendencias.map((juego, index) => (
                                <div
                                    key={juego._id}
                                    className="min-w-[200px] h-[300px] bg-[#2f2f2f] rounded-md hover:scale-105 transition-all duration-300 cursor-pointer relative group/card flex-shrink-0 animate-fade-in"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animation: 'fadeInUp 0.5s ease-out forwards'
                                    }}
                                >
                                    <div onClick={() => abrirModal(juego)} className="w-full h-full">
                                        {juego.imagenPortada ? (
                                            <img src={juego.imagenPortada} alt={juego.titulo} className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#b3b3b3]">Sin imagen</div>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center rounded-md">
                                            <span className="font-bold text-center px-2">{juego.titulo}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleFavorito(juego);
                                        }}
                                        className="absolute top-2 right-2 p-2 rounded-full bg-black/70 hover:bg-black/90 transition-all duration-200 z-10 opacity-0 group-hover/card:opacity-100"
                                        title={juego.favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transition-all duration-200 ${juego.favorito ? 'text-[#e50914] fill-current scale-110' : 'text-white'}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            )) : (
                                <p className="text-[#b3b3b3]">No hay juegos disponibles.</p>
                            )}
                        </div>

                        {mostrarBotonTendencias && (
                            <button
                                onClick={() => scrollHorizontal(tendenciasRef, 'right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </section>

                {/* Sección: Tus Favoritos */}
                <section className="relative">
                    <h2 className="text-2xl font-bold mb-4 text-[#e5e5e5] hover:text-white transition cursor-pointer">Tus Favoritos</h2>
                    <div className="relative group">
                        <div
                            ref={favoritosRef}
                            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
                        >
                            {favoritos.length > 0 ? favoritos.map((juego) => (
                                <div
                                    key={juego._id}
                                    onClick={() => abrirModal(juego)}
                                    className="min-w-[200px] h-[112px] bg-[#2f2f2f] rounded-md hover:scale-105 transition-all duration-300 cursor-pointer relative group/card flex-shrink-0"
                                >
                                    {juego.imagenPortada ? (
                                        <img src={juego.imagenPortada} alt={juego.titulo} className="w-full h-full object-cover rounded-md" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#b3b3b3]">Sin imagen</div>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="font-bold text-center px-2">{juego.titulo}</span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-[#b3b3b3]">Aún no tienes favoritos. Ve a tu biblioteca y marca algunos.</p>
                            )}
                        </div>

                        {mostrarBotonFavoritos && (
                            <button
                                onClick={() => scrollHorizontal(favoritosRef, 'right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </section>
            </div>

            {/* Modal de Detalles del Juego */}
            <DetalleJuegoModal
                juego={juegoSeleccionado}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onAgregarBiblioteca={handleAgregarBiblioteca}
                onToggleFavorito={handleToggleFavorito}
                enBiblioteca={juegoSeleccionado?.enBiblioteca}
            />
        </div>
    );
};

export default HomePage;
