import StarRating from '../common/StarRating.jsx';

const TarjetaResena = ({ resena }) => {
  return (
    <div className="bg-steam-dark p-6 rounded-lg shadow-lg border border-steam-darkest">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-xl text-steam-blue">
            {resena.juego?.titulo || 'Juego desconocido'}
          </h4>
          <p className="text-sm text-steam-gray">{resena.juego?.plataforma}</p>
        </div>
        <StarRating rating={resena.puntuacion} readOnly />
      </div>

      <p className="mt-3 text-steam-gray-light leading-relaxed">{resena.textoReseña}</p>

      <div className="mt-4 pt-4 border-t border-steam-darkest text-sm text-steam-gray flex flex-wrap gap-x-3 gap-y-1">
        <span>Horas jugadas: {resena.horasJugadas || 0}</span>
        <span className="text-steam-gray-dark">•</span> <span>Dificultad: {resena.dificultad}</span>
        <span className="text-steam-gray-dark">•</span> <span className={resena.recomendaria ? 'text-steam-green' : 'text-red-400'}>{resena.recomendaria ? 'Recomendado' : 'No recomendado'}</span>
      </div>
    </div>
  );
};

export default TarjetaResena;