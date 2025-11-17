import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
// Asume que tienes funciones createResena y updateResena en tus servicios de API
// import { createResena, updateResena } from '../services/api';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

const FormularioResena = ({ resenaActual, juegoId, onClose }) => {
  const [formData, setFormData] = useState({
    puntuacion: 0,
    textoResena: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: false,
  });

  useEffect(() => {
    if (resenaActual) {
      setFormData(resenaActual);
    }
  }, [resenaActual]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, juego: juegoId };
      // Lógica para crear o actualizar reseña
      // if (resenaActual) {
      //   await updateResena(resenaActual._id, dataToSend);
      // } else {
      //   await createResena(dataToSend);
      // }
      console.log('Enviando reseña:', dataToSend);
      onClose(); // Cierra el modal o formulario
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div>
        <label className="block mb-2 font-bold">Puntuación:</label>
        <StarRating rating={formData.puntuacion} setRating={(rating) => setFormData({ ...formData, puntuacion: rating })} />
      </div>
      <textarea name="textoResena" value={formData.textoResena} onChange={handleChange} placeholder="Escribe tu reseña..." className="border p-2 w-full" required />
      <input name="horasJugadas" type="number" value={formData.horasJugadas} onChange={handleChange} placeholder="Horas Jugadas" className="border p-2 w-full" />
      <select name="dificultad" value={formData.dificultad} onChange={handleChange} className="border p-2 w-full">
        <option value="Fácil">Fácil</option>
        <option value="Normal">Normal</option>
        <option value="Difícil">Difícil</option>
        <option value="Muy Difícil">Muy Difícil</option>
      </select>
      <div className="flex items-center">
        <input type="checkbox" id="recomendaria" name="recomendaria" checked={formData.recomendaria} onChange={handleChange} className="mr-2" />
        <label htmlFor="recomendaria">¿Lo recomendarías?</label>
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600">
        {resenaActual ? 'Actualizar Reseña' : 'Guardar Reseña'}
      </button>
    </form>
  );
};

export default FormularioResena;