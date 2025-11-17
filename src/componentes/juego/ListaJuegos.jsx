import TarjetaJuego from './TarjetaJuego';

const ListaJuegos = ({ juegos, onEdit, onDelete }) => {
  if (juegos.length === 0) {
    return <p className="text-center text-gray-500">No hay juegos en tu biblioteca.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {juegos.map((juego) => (
        <TarjetaJuego
          key={juego._id}
          juego={juego}
          onEdit={() => onEdit(juego)}
          onDelete={() => onDelete(juego._id)}
        />
      ))}
    </div>
  );
};

export default ListaJuegos;