import { Link } from 'react-router-dom';
import { useState } from 'react';

const ListaJuegos = ({ juegos, onDelete, onToggleFavorito, onUpdateHoras, onUpdateEstado }) => {
  // Estados locales para manejar la edición rápida de horas jugadas
  const [editandoHoras, setEditandoHoras] = useState(null);
  const [horasTemp, setHorasTemp] = useState('');

  // Si no hay juegos, mostrar mensaje informativo
  if (!juegos || juegos.length === 0) {
    return (
      <p className="text-center text-[#b3b3b3] py-12 text-lg">
        No hay juegos en tu biblioteca aún.
      </p>
    );
  }

  // Función auxiliar para obtener clases de color según el estado del juego
  const getStatusBadgeClass = (estado) => {
    switch (estado) {
      case 'completado':
        return 'bg-green-900/50 text-green-400';
      case 'en progreso':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'no empezado':
        return 'bg-gray-900/50 text-gray-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  // Manejador para cambiar el estado del juego (dropdown)
  const handleEstadoChange = (juego, nuevoEstado) => {
    if (onUpdateEstado) {
      onUpdateEstado(juego, nuevoEstado);
    }
  };

  // Manejador para guardar las horas editadas
  const handleHorasSubmit = (juego) => {
    const horas = parseInt(horasTemp);
    if (!isNaN(horas) && horas >= 0) {
      if (onUpdateHoras) {
        onUpdateHoras(juego, horas);
      }
      setEditandoHoras(null);
      setHorasTemp('');
    }
  };

  // Manejador para eliminar un juego
  const handleDeleteClick = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {juegos.map((juego) => (
        <div
          key={juego._id}
          className={`bg - [#181818] rounded - lg shadow - lg overflow - hidden transition - all duration - 300 hover: shadow - 2xl hover: scale - 105 border - 2 ${
  juego.estado === 'completado' ? 'border-green-600' : 'border-transparent'
} `}
        >
          {/* Portada del Juego */}
          <div className="h-48 bg-[#2f2f2f] relative group">
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

            {/* Botón Favorito (visible en hover o si es favorito) */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onToggleFavorito) {
                  onToggleFavorito(juego);
                }
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              title={juego.favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h - 6 w - 6 transition - colors ${ juego.favorito ? 'text-[#e50914] fill-current' : 'text-white' } `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Contenido de la Tarjeta */}
          <div className="p-4">
            <h3 className="font-bold text-lg text-white truncate">
              {juego.titulo}
            </h3>
            <p className="text-sm text-[#b3b3b3] mt-1">{juego.plataforma}</p>
            <p className="text-xs text-[#808080] mt-2">
              {juego.genero} • {juego.añoLanzamiento || 'Año desconocido'}
            </p>

            {/* Sección de Horas Jugadas (Editable) */}
            <div className="mt-3">
              {editandoHoras === juego._id ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={horasTemp}
                    onChange={(e) => setHorasTemp(e.target.value)}
                    className="flex-1 px-2 py-1 bg-[#2f2f2f] text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                    placeholder="Horas"
                    autoFocus
                  />
                  <button
                    onClick={() => handleHorasSubmit(juego)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setEditandoHoras(null);
                      setHorasTemp('');
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    ✗
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditandoHoras(juego._id);
                    setHorasTemp(juego.horasJugadas?.toString() || '0');
                  }}
                  className="flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-white">{juego.horasJugadas || 0}h</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Selector de Estado */}
            <div className="mt-3">
              <label className="text-sm font-medium text-[#b3b3b3] block mb-2">Estado:</label>
              <select
                value={juego.estado || 'no empezado'}
                onChange={(e) => handleEstadoChange(juego, e.target.value)}
                className={`w - full px - 3 py - 2 rounded - md text - xs font - semibold ${ getStatusBadgeClass(juego.estado) } border - none focus: outline - none focus: ring - 2 focus: ring - [#e50914]`}
              >
                <option value="no empezado">No empezado</option>
                <option value="en progreso">En progreso</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            {/* Enlace a reseñas */}
            <Link
              to={`/ resenas ? juegoId = ${ juego._id } `}
              className="block mt-4 text-[#e50914] hover:text-[#f40612] font-medium text-sm"
            >
              Ver reseñas →
            </Link>

            {/* Botón de eliminar */}
            <div className="mt-4 pt-4 border-t border-[#2f2f2f]">
              <button
                onClick={() => handleDeleteClick(juego._id)}
                className="w-full bg-red-600/80 text-white px-3 py-2 rounded-md hover:bg-red-600 transition text-sm font-medium"
              >
                Eliminar de la Biblioteca
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaJuegos;