import TarjetaResena from './TarjetaResena';

const ListaResenas = ({ resenas }) => {
  if (resenas.length === 0) {
    return <p className="text-center text-gray-500">No hay reseñas aún.</p>;
  }

  return (
    <div className="space-y-4">
      {resenas.map((resena) => (
        <TarjetaResena key={resena._id} resena={resena} />
      ))}
    </div>
  );
};

export default ListaResenas;