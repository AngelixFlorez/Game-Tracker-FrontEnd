import React, { useEffect, useState } from 'react';
import { getJuegos, deleteJuego, updateJuego } from '../services/api';
import TarjetaJuego from '../componentes/TarjetaJuego';

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [filtro, setFiltro] = useState('');

  const fetchJuegos = async () => {
    try {
      const res = await getJuegos();
      setJuegos(res.data);
    } catch (err) {
      console.error("Error al cargar los juegos:", err);
    }
  };

  useEffect(() => {
    fetchJuegos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      try {
        await deleteJuego(id);
        fetchJuegos(); // Recargar la lista de juegos
      } catch (err) {
        console.error("Error al eliminar el juego:", err);
      }
    }
  };

  const handleCompletado = async (juego) => {
    try {
      await updateJuego(juego._id, { ...juego, completado: !juego.completado });
      fetchJuegos(); // Recargar para mostrar el estado actualizado
    } catch (err) {
      console.error("Error al actualizar el juego:", err);
    }
  };

  const juegosFiltrados = juegos.filter(juego =>
    juego.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por título..."
        className="mb-4 p-2 border rounded w-full"
        onChange={(e) => setFiltro(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {juegosFiltrados.map(juego => (
          <TarjetaJuego key={juego._id} juego={juego} onEliminar={handleEliminar} onCompletado={handleCompletado} />
        ))}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;