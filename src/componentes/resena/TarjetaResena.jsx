import StarRating from '../common/StarRating.jsx';

const TarjetaResena = ({ resena }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-lg">{resena.juegoId?.titulo || 'Juego desconocido'}</h4>
          <p className="text-sm text-gray-600">por {resena.juegoId?.plataforma}</p>
        </div>
        <StarRating rating={resena.puntuacion} readOnly />
      </div>

      <p className="mt-3 text-gray-700">{resena.textoReseña}</p>

      <div className="mt-3 text-sm text-gray-500">
        <span>Horas: {resena.horasJugadas} • </span>
        <span>Dificultad: {resena.dificultad} • </span>
        <span>{resena.recomendaria ? 'Recomendado' : 'No recomendado'}</span>
      </div>
    </div>
  );
};

export default TarjetaResena;