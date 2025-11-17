import Button from '../common/Button';
import { Link } from 'react-router-dom';

const TarjetaJuego = ({ juego, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={juego.imagenPortada}
        alt={juego.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{juego.titulo}</h3>
        <p className="text-sm text-gray-600">{juego.genero} • {juego.plataforma}</p>
        <p className="text-sm text-gray-500">Año: {juego.añoLanzamiento}</p>
        <p className="text-sm font-medium mt-2">
          Completado: {juego.completado ? 'Sí' : 'No'}
        </p>
        <p className="text-sm">Horas jugadas: {juego.horasJugadas}</p>

        <div className="mt-4 flex gap-2">
          <Button onClick={onEdit} variant="secondary">Editar</Button>
          <Button onClick={onDelete} variant="danger">Eliminar</Button>
          <Link
            to={`/resenas?juegoId=${juego._id}`}
            className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
          >
            Ver Reseñas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TarjetaJuego;