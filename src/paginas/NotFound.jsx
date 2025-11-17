const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
      <a href="/" className="text-blue-600 hover:underline">Volver al inicio</a>
    </div>
  );
};

export default NotFound;