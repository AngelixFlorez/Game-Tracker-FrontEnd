import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListaResenas from '../componentes/resena/ListaResenas.jsx';
import Modal from '../componentes/common/Modal.jsx';
import FormularioResena from '../componentes/resena/FormularioResena.jsx';
import { getResenas, createResena } from '../services/api';

const ListaResenasPage = () => {
  const [searchParams] = useSearchParams();
  const juegoId = searchParams.get('juegoId');
  const [resenas, setResenas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await getResenas(juegoId);
      setResenas(res.data);
    };
    fetch();
  }, [juegoId]);

  const handleNuevaResena = async (data) => {
    await createResena(data);
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reseñas</h1>
        {juegoId && (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Nueva Reseña
          </button>
        )}
      </div>

      <ListaResenas resenas={resenas} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Escribir Reseña">
        <FormularioResena juegoId={juegoId} onSuccess={handleNuevaResena} />
      </Modal>
    </div>
  );
};

export default ListaResenasPage;