import React from 'react';
import { Link } from 'react-router-dom';

const TarjetaJuego = ({ juego, onEliminar, onCompletado }) => {
  const imagenPorDefecto = 'https://via.placeholder.com/300x400.png?text=No+Image';

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white flex flex-col">
      <img 
        src={juego.imagenPortada || imagenPorDefecto} 
        alt={`Portada de ${juego.titulo}`} 
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src=imagenPorDefecto; }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold">{juego.titulo}</h3>
        <p className="text-sm text-gray-600">{juego.genero}</p>
        <p className={`text-sm font-semibold ${juego.completado ? 'text-green-500' : 'text-yellow-500'}`}>
          {juego.completado ? 'Completado' : 'Pendiente'}
        </p>
        <div className="mt-auto pt-4 space-y-2">
          <Link to={`/juego/${juego._id}/resenas`} className="block text-center bg-gray-200 p-2 rounded hover:bg-gray-300">
            Ver Reseñas
          </Link>
          <button onClick={() => onCompletado(juego)} className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
            {juego.completado ? 'Marcar Pendiente' : 'Marcar Completado'}
          </button>
          <button onClick={() => onEliminar(juego._id)} className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaJuego;