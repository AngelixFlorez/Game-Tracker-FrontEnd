import TarjetaJuego from './TarjetaJuego.jsx';

const ListaJuegos = ({ juegos, onDelete, onCompletado, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {juegos.map((juego) => (
        <div key={juego._id} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">{juego.titulo}</h3>
          <p>{juego.plataforma}</p>
          <p>Completado: {juego.completado ? 'Sí' : 'No'}</p>

          <div className="mt-4 flex gap-2">
            <button onClick={() => onEdit(juego)} className="bg-yellow-500 text-white px-3 py-1 rounded">
              Editar
            </button>
            <button onClick={() => onCompletado(juego)} className="bg-green-500 text-white px-3 py-1 rounded">
              {juego.completado ? 'Desmarcar' : 'Completar'}
            </button>
            <button onClick={() => onDelete(juego._id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaJuegos;