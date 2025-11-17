import React from 'react';
import { FaStar } from 'react-icons/fa'; // Para estrellas, pero puntuación es en reseñas

const TarjetaJuego = ({ juego }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={juego.imagenPortada} alt={juego.titulo} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{juego.titulo}</h2>
      <p>{juego.genero} - {juego.plataforma}</p>
      <p>Año: {juego.añoLanzamiento}</p>
      <p>Completado: {juego.completado ? 'Sí' : 'No'}</p>
      <p>Horas jugadas: {juego.horasJugadas}</p>
      {/* Botones para editar/eliminar/reseñas */}
    </div>
  );
};

export default TarjetaJuego;