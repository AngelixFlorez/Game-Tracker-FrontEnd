import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TarjetaResena from '../componentes/resena/TarjetaResena.jsx';
import Modal from '../componentes/common/Modal.jsx';
import FormularioResena from '../componentes/resena/FormularioResena.jsx';
import ConfirmDialog from '../componentes/common/ConfirmDialog.jsx';
import { getResenas, createResena, updateResena, deleteResena } from '../services/api';

const ListaResenasPage = () => {
  // Obtener parámetros de búsqueda de la URL (ej: ?juegoId=123)
  const [searchParams] = useSearchParams();
  const juegoId = searchParams.get('juegoId');

  // Estados para reseñas, modal, edición y confirmación
  const [resenas, setResenas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resenaEditar, setResenaEditar] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, resenaId: null });

  // Función para cargar reseñas (filtradas por juego si existe juegoId)
  const cargarResenas = async () => {
    try {
      const res = await getResenas(juegoId);
      setResenas(res.data);
    } catch (err) {
      alert('Error al cargar reseñas');
    }
  };

  // Cargar reseñas al cambiar el juegoId o al montar
  useEffect(() => {
    cargarResenas();
  }, [juegoId]);

  // Manejador para guardar una reseña (crear o editar)
  const handleGuardarResena = async (data) => {
    try {
      if (resenaEditar) {
        await updateResena(resenaEditar._id, { ...data, juegoId: data.juegoId || juegoId });
      } else {
        await createResena({ ...data, juegoId: data.juegoId || juegoId });
      }
      setModalOpen(false);
      setResenaEditar(null);
      cargarResenas(); // Recargar lista
    } catch (err) {
      console.error('Error al guardar reseña:', err);
      alert('Error al guardar reseña: ' + (err.response?.data?.message || err.message));
    }
  };

  // Abrir diálogo de confirmación para eliminar
  const handleEliminarResena = (id) => {
    setConfirmDialog({ isOpen: true, resenaId: id });
  };

  // Ejecutar la eliminación de la reseña
  const confirmarEliminacion = async () => {
    try {
      await deleteResena(confirmDialog.resenaId);
      cargarResenas();
      setConfirmDialog({ isOpen: false, resenaId: null });
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      alert('Error al eliminar la reseña');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Encabezado y Botón de Nueva Reseña */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">
          {juegoId ? 'Reseñas del Juego' : 'Todas las Reseñas'}
        </h1>
        <button
          onClick={() => {
            setResenaEditar(null);
            setModalOpen(true);
          }}
          className="bg-[#e50914] text-white font-bold px-4 py-2 rounded-md hover:bg-[#f40612] transition-colors"
        >
          + Nueva Reseña
        </button>
      </div>

      {/* Lista de Reseñas o Mensaje de Vacío */}
      {resenas.length === 0 ? (
        <p className="text-center text-[#b3b3b3] py-10">
          {juegoId ? 'Este juego aún no tiene reseñas.' : 'No hay reseñas aún.'}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resenas.map((resena) => (
            <div key={resena._id} className="relative">
              <TarjetaResena resena={resena} />
              {/* Botones de Editar/Eliminar */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    setResenaEditar(resena);
                    setModalOpen(true);
                  }}
                  className="bg-[#e50914]/80 text-white px-2 py-1 rounded text-xs hover:bg-[#e50914]"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminarResena(resena._id)}
                  className="bg-red-500/80 text-white px-2 py-1 rounded text-xs hover:bg-red-500"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Formulario */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setResenaEditar(null);
        }}
        title={resenaEditar ? 'Editar Reseña' : 'Nueva Reseña'}
      >
        <FormularioResena
          juegoId={juegoId}
          resena={resenaEditar}
          onSuccess={handleGuardarResena}
        />
      </Modal>

      {/* Diálogo de Confirmación */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, resenaId: null })}
        onConfirm={confirmarEliminacion}
        title="Eliminar Reseña"
        message="¿Estás seguro de que quieres eliminar esta reseña? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default ListaResenasPage;