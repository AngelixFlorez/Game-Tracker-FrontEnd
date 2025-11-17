const ListaResenas = ({ resenas }) => {
  if (resenas.length === 0) {
    return <p className="text-center text-gray-500 py-8">No hay reseñas aún.</p>;
  }

  return (
    <div className="space-y-4">
      {resenas.map((resena) => (
        <div key={resena._id} className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold">{resena.juego?.titulo || 'Juego desconocido'}</h4>
          <p className="text-sm text-gray-600">Puntuación: {resena.puntuacion} / 5</p>
          <p className="mt-2">{resena.textoReseña}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaResenas;