import { useState, useEffect } from 'react';
import ListaJuegos from '../componentes/juego/ListaJuegos.jsx';
import ConfirmDialog from '../componentes/common/ConfirmDialog.jsx';
import { getJuegos, updateJuego } from '../services/api.js';
import LoadingSpinner from '../componentes/common/LoadingSpinner.jsx';

const BibliotecaJuegos = () => {
  // Estados para manejar la lista de juegos, carga, búsqueda y diálogo de confirmación
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, juegoId: null });

  // Función para cargar los juegos desde la API
  const cargarJuegos = async () => {
    setLoading(true);
    try {
      const res = await getJuegos();
      // Filtrar solo los juegos que están en la biblioteca
      const juegosBiblioteca = res.data.filter(juego => juego.enBiblioteca === true);
      setJuegos(juegosBiblioteca);
    } catch (err) {
      alert('Error al cargar juegos');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los juegos al montar el componente
  useEffect(() => {
    cargarJuegos();
  }, []);

  // Manejador para abrir el diálogo de confirmación de eliminación
  const handleDelete = async (id) => {
    setConfirmDialog({ isOpen: true, juegoId: id });
  };

  // Función para confirmar y ejecutar la eliminación (quitar de biblioteca)
  const confirmarEliminacion = async () => {
    const id = confirmDialog.juegoId;
    try {
      const juegoAEliminar = juegos.find(j => j._id === id);
      // Actualizar el juego en el backend poniendo enBiblioteca: false
      await updateJuego(id, { ...juegoAEliminar, enBiblioteca: false });
      // Actualizar el estado local
      setJuegos(juegos.filter(j => j._id !== id));
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('Error al eliminar el juego de la biblioteca');
    }
  };

  // Manejador para actualizar el estado del juego (ej: completado, en progreso)
  const handleUpdateEstado = async (juego, nuevoEstado) => {
    try {
      await updateJuego(juego._id, { ...juego, estado: nuevoEstado });
      cargarJuegos(); // Recargar para reflejar cambios
    } catch (err) {
      alert('Error al actualizar el estado');
    }
  };

  // Manejador para actualizar las horas jugadas
  const handleUpdateHoras = async (juego, horas) => {
    try {
      await updateJuego(juego._id, { ...juego, horasJugadas: horas });
      cargarJuegos();
    } catch (err) {
      alert('Error al actualizar las horas jugadas');
    }
  };

  // Manejador para marcar/desmarcar como favorito
  const handleToggleFavorito = async (juego) => {
    try {
      await updateJuego(juego._id, { ...juego, favorito: !juego.favorito });
      cargarJuegos();
    } catch (err) {
      alert('Error al actualizar favoritos');
    }
  };

  // Filtrar juegos según el término de búsqueda
  const juegosFiltrados = juegos.filter(juego =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Encabezado y Barra de Búsqueda */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold text-white">Mi Biblioteca</h1>
        <input
          type="text"
          placeholder="Buscar juego..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="px-4 py-2 border border-[#2f2f2f] bg-[#181818] text-white rounded-md focus:outline-none focus:border-[#e50914] flex-1 sm:flex-initial sm:max-w-xs"
        />
      </div>

      {/* Lista de Juegos o Mensaje de Vacío */}
      {loading ? (
        <LoadingSpinner />
      ) : juegosFiltrados.length === 0 ? (
        <p className="text-center text-[#b3b3b3] py-10">
          {busqueda ? 'No se encontraron juegos con ese nombre.' : 'Tu biblioteca está vacía. ¡Agrega juegos desde la página de inicio!'}
        </p>
      ) : (
        <ListaJuegos
          juegos={juegosFiltrados}
          onDelete={handleDelete}
          onUpdateEstado={handleUpdateEstado}
          onUpdateHoras={handleUpdateHoras}
          onToggleFavorito={handleToggleFavorito}
        />
      )}

      {/* Diálogo de Confirmación */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, juegoId: null })}
        onConfirm={confirmarEliminacion}
        title="Quitar de la Biblioteca"
        message="¿Estás seguro de que quieres quitar este juego de tu biblioteca? Podrás agregarlo nuevamente más tarde."
      />
    </div>
  );
};

export default BibliotecaJuegos;