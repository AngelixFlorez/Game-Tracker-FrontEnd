import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormularioResena from '../components/FormularioResena';
// Asume que tienes una función getResenasPorJuego en tu API
// import { getResenasPorJuego } from '../services/api';

const ListaResenas = () => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { juegoId } = useParams(); // Obtiene el ID del juego de la URL

  const fetchResenas = async () => {
    try {
      setLoading(true);
      // const data = await getResenasPorJuego(juegoId);
      // setResenas(data);
      console.log(`Fetching reviews for game ${juegoId}`);
      // Datos de ejemplo hasta que la API esté lista
      setResenas([
        { _id: '1', puntuacion: 5, textoResena: '¡Increíble!', horasJugadas: 100 },
        { _id: '2', puntuacion: 4, textoResena: 'Muy buen juego, aunque con algunos bugs.', horasJugadas: 80 },
      ]);
    } catch (err) {
      setError('No se pudieron cargar las reseñas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResenas();
  }, [juegoId]);

  if (loading) return <p>Cargando reseñas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reseñas del Juego</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Agregar Reseña
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <FormularioResena juegoId={juegoId} onClose={() => { setShowModal(false); fetchResenas(); }} />
            <button onClick={() => setShowModal(false)} className="mt-2 text-red-500">Cerrar</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resenas.length > 0 ? (
          resenas.map(resena => (
            <div key={resena._id} className="p-4 border rounded-lg shadow">
              <p><strong>Puntuación:</strong> {'⭐'.repeat(resena.puntuacion)}</p>
              <p>{resena.textoResena}</p>
              <p className="text-sm text-gray-500">Horas jugadas: {resena.horasJugadas}</p>
            </div>
          ))
        ) : (
          <p>No hay reseñas para este juego todavía. ¡Sé el primero en agregar una!</p>
        )}
      </div>
    </div>
  );
};

export default ListaResenas;