import React, { useState, useEffect } from 'react';
import { createJuego, updateJuego } from '../services/api'; // Agrega updateJuego en api.js

const FormularioJuego = ({ juegoActual, onClose }) => {
  const [formData, setFormData] = useState({
    titulo: '', genero: '', plataforma: '', añoLanzamiento: '', desarrollador: '', descripcion: '', imagenPortada: '', completado: false, horasJugadas: 0
  });

  useEffect(() => {
    if (juegoActual) setFormData(juegoActual);
  }, [juegoActual]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (juegoActual) {
        await updateJuego(juegoActual._id, formData);
      } else {
        await createJuego(formData);
      }
      onClose(); // Cierra modal o recarga
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" className="border p-2 w-full" required />
      {/* Agrega inputs para todos los campos, checkbox para completado, number para horas */}
      <button type="submit" className="bg-blue-500 text-white p-2">Guardar</button>
    </form>
  );
};

export default FormularioJuego;
