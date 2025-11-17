import { useState, useEffect } from 'react';
import ListaJuegos from '../components/juego/ListaJuegos';
import Modal from '../components/common/Modal';
import FormularioJuego from '../components/juego/FormularioJuego';
import { getJuegos, createJuego, updateJuego, deleteJuego } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

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

  const handleGuardar = async (data) => {
    try {
      if (juegoEditar) {
        await updateJuego(juegoEditar._id, data);
      } else {
        await createJuego(data);
      }
      cargarJuegos();
      setModalOpen(false);
      setJuegoEditar(null);
    } catch (err) {
      alert('Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este juego?')) {
      await deleteJuego(id);
      cargarJuegos();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mi Biblioteca</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Agregar Juego
        </button>
      </div>

      {loading ? <LoadingSpinner /> : <ListaJuegos juegos={juegos} onEdit={setJuegoEditar} onDelete={handleDelete} />}

      <Modal
        isOpen={modalOpen || !!juegoEditar}
        onClose={() => {
          setModalOpen(false);
          setJuegoEditar(null);
        }}
        title={juegoEditar ? 'Editar Juego' : 'Nuevo Juego'}
      >
        <FormularioJuego juego={juegoEditar} onSuccess={handleGuardar} />
      </Modal>
    </div>
  );
};

export default BibliotecaJuegos;