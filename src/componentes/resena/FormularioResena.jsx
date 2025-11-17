import { useState } from 'react';
import StarRating from '../common/StarRating.jsx';
import Button from '../common/Button.jsx';

const FormularioResena = ({ juegoId, onSuccess, resena }) => {
  const [formData, setFormData] = useState({
    juegoId: juegoId || '',
    puntuacion: resena?.puntuacion || 0,
    textoReseña: resena?.textoReseña || '',
    horasJugadas: resena?.horasJugadas || 0,
    dificultad: resena?.dificultad || 'Normal',
    recomendaria: resena?.recomendaria ?? true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Puntuación</label>
        <StarRating
          rating={formData.puntuacion}
          onRatingChange={(val) => setFormData({ ...formData, puntuacion: val })}
        />
      </div>

      <div>
        <label htmlFor="textoReseña" className="block font-medium">Reseña</label>
        <textarea
          id="textoReseña"
          name="textoReseña"
          value={formData.textoReseña}
          onChange={(e) => setFormData({ ...formData, textoReseña: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="horasJugadas">Horas Jugadas</label>
          <input
            type="number"
            id="horasJugadas"
            value={formData.horasJugadas}
            onChange={(e) => setFormData({ ...formData, horasJugadas: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="dificultad">Dificultad</label>
          <select
            id="dificultad"
            value={formData.dificultad}
            onChange={(e) => setFormData({ ...formData, dificultad: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option>Fácil</option>
            <option>Normal</option>
            <option>Difícil</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="recomendaria"
          checked={formData.recomendaria}
          onChange={(e) => setFormData({ ...formData, recomendaria: e.target.checked })}
          className="w-5 h-5"
        />
        <label htmlFor="recomendaria">¿Lo recomendarías?</label>
      </div>

      <Button type="submit" className="w-full">
        {resena ? 'Actualizar Reseña' : 'Publicar Reseña'}
      </Button>
    </form>
  );
};

export default FormularioResena;