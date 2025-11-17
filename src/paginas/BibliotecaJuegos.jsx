import { useState, useEffect } from 'react';
import ListaJuegos from '../componentes/juego/ListaJuegos.jsx';
import Modal from '../componentes/common/Modal.jsx';
import FormularioJuego from '../componentes/juego/FormularioJuego.jsx';
import { getJuegos, createJuego, updateJuego, deleteJuego } from '../services/api.js';
import LoadingSpinner from '../componentes/common/LoadingSpinner.jsx';

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [juegoEditar, setJuegoEditar] = useState(null);

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

  useEffect(() => {
    cargarJuegos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      try {
        await deleteJuego(id);
        cargarJuegos();
        alert('Juego eliminado con éxito');
      } catch (err) {
        alert('Error al eliminar el juego');
      }
    }
  };

  const handleCompletado = async (juego) => {
    try {
      await updateJuego(juego._id, { ...juego, completado: !juego.completado });
      cargarJuegos();
      alert('Estado de completado actualizado');
    } catch (err) {
      alert('Error al actualizar el estado');
    }
  };

  const handleGuardar = async () => {
    setModalOpen(false);
    setJuegoEditar(null);
    cargarJuegos();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mi Biblioteca</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Agregar Juego
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ListaJuegos
          juegos={juegos}
          onDelete={handleDelete}
          onCompletado={handleCompletado}
          onEdit={(juego) => {
            setJuegoEditar(juego);
            setModalOpen(true);
          }}
        />
      )}

      <Modal
        isOpen={modalOpen || !!juegoEditar}
        onClose={() => {
          setModalOpen(false);
          setJuegoEditar(null);
        }}
        title={juegoEditar ? 'Editar Juego' : 'Nuevo Juego'}
      >
        <FormularioJuego
          juego={juegoEditar}
          onSuccess={handleGuardar}
        />
      </Modal>
    </div>
  );
};

export default BibliotecaJuegos;