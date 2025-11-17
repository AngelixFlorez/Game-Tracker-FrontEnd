import { useState, useEffect } from 'react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

const FormularioJuego = ({ juego, onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    descripcion: '',
    imagenPortada: 'https://via.placeholder.com/300x400?text=Sin+Portada',
    completado: false,
    horasJugadas: 0
  });

  useEffect(() => {
    if (juego) setFormData(juego);
  }, [juego]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Título" name="titulo" value={formData.titulo} onChange={handleChange} required />
      <Input label="Género" name="genero" value={formData.genero} onChange={handleChange} required />
      <Input label="Plataforma" name="plataforma" value={formData.plataforma} onChange={handleChange} required />
      <Input label="Año de Lanzamiento" name="añoLanzamiento" type="number" value={formData.añoLanzamiento} onChange={handleChange} required />
      <Input label="Desarrollador" name="desarrollador" value={formData.desarrollador} onChange={handleChange} required />
      <Input label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
      <Input label="URL de Portada" name="imagenPortada" value={formData.imagenPortada} onChange={handleChange} />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completado"
          name="completado"
          checked={formData.completado}
          onChange={handleChange}
          className="w-5 h-5"
        />
        <label htmlFor="completado" className="font-medium">Completado</label>
      </div>

      <Input label="Horas Jugadas" name="horasJugadas" type="number" value={formData.horasJugadas} onChange={handleChange} />

      <Button type="submit" className="w-full">
        {juego ? 'Actualizar Juego' : 'Crear Juego'}
      </Button>
    </form>
  );
};

export default FormularioJuego;