import Button from '../common/Button.jsx';
import { Link } from 'react-router-dom';

// Componente de Tarjeta de Juego (Vista Resumida)
const TarjetaJuego = ({ juego, onEdit, onDelete }) => {
  return (
    <div className="bg-[#181818] rounded-md shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 group">
      {/* Imagen de Portada con Overlay de Descripción */}
      <div className="relative">
        <img
          src={juego.imagenPortada}
          alt={juego.titulo}
          className="w-full h-48 object-cover"
        />
        {/* Overlay que aparece en hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <p className="text-white text-sm text-center line-clamp-4">{juego.descripcion}</p>
        </div>
      </div>

      {/* Información del Juego */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{juego.titulo}</h3>
        <div className="flex items-center gap-2 text-xs text-[#b3b3b3] mb-2">
          <span className="border border-[#b3b3b3] px-1 rounded">{juego.genero}</span>
          <span>{juego.añoLanzamiento}</span>
          <span>{juego.plataforma}</span>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="flex justify-between items-center text-xs text-[#b3b3b3] mb-4">
          <span>{juego.horasJugadas}h jugadas</span>
          <span>{juego.completado ? 'Completado' : 'En progreso'}</span>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-2 mt-auto">
          <Button onClick={onEdit} variant="secondary" className="text-xs py-1 px-2">Editar</Button>
          <Button onClick={onDelete} variant="danger" className="text-xs py-1 px-2">Eliminar</Button>
          <Link
            to={`/resenas?juegoId=${juego._id}`}
            className="flex-1 text-center bg-[#e50914] hover:bg-[#f40612] text-white px-3 py-1 rounded text-sm font-bold transition-colors"
          >
            Ver Reseñas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TarjetaJuego;