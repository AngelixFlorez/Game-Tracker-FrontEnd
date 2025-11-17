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
      <input name="genero" value={formData.genero} onChange={handleChange} placeholder="Género" className="border p-2 w-full" />
      <input name="plataforma" value={formData.plataforma} onChange={handleChange} placeholder="Plataforma" className="border p-2 w-full" />
      <input name="añoLanzamiento" type="number" value={formData.añoLanzamiento} onChange={handleChange} placeholder="Año de Lanzamiento" className="border p-2 w-full" />
      <input name="desarrollador" value={formData.desarrollador} onChange={handleChange} placeholder="Desarrollador" className="border p-2 w-full" />
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="border p-2 w-full" />
      <input name="imagenPortada" value={formData.imagenPortada} onChange={handleChange} placeholder="URL de la Imagen de Portada" className="border p-2 w-full" />
      <div className="flex items-center">
        <label htmlFor="completado" className="mr-2">Completado:</label>
        <input id="completado" name="completado" type="checkbox" checked={formData.completado} onChange={handleChange} className="h-5 w-5" />
      </div>
      <div className="flex items-center">
        <label htmlFor="horasJugadas" className="mr-2">Horas Jugadas:</label>
        <input id="horasJugadas" name="horasJugadas" type="number" value={formData.horasJugadas} onChange={handleChange} placeholder="Horas Jugadas" className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">{juegoActual ? 'Actualizar' : 'Guardar'}</button>
    </form>
  );
};

export default FormularioJuego;
