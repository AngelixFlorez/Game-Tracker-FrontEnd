import { useState, useEffect } from 'react';
import StarRating from '../common/StarRating.jsx';
import Button from '../common/Button.jsx';
import { getJuegos } from '../../services/api.js';

// Componente FormularioResena: Permite a los usuarios crear o editar una reseña de un juego.
// Recibe las siguientes props:
// - juegoId: ID del juego al que se asocia la reseña (opcional, si se crea una reseña para un juego específico).
// - onSuccess: Función de callback que se ejecuta al enviar el formulario con éxito.
// - resena: Objeto de reseña existente si se está editando una reseña.
const FormularioResena = ({ juegoId, onSuccess, resena }) => {
  // Estado para almacenar la lista de juegos, usado cuando no se proporciona un juegoId.
  const [juegos, setJuegos] = useState([]);
  // Estado para los datos del formulario. Se inicializa con los datos de una reseña existente (si la hay)
  // o con valores predeterminados.
  const [formData, setFormData] = useState({
    juegoId: juegoId || resena?.juegoId || '', // ID del juego, tomado de props o reseña existente.
    usuario: resena?.usuario || '', // Nombre del usuario.
    puntuacion: resena?.puntuacion || 0, // Puntuación del juego (0-5 estrellas).
    textoReseña: resena?.textoReseña || '', // Contenido de la reseña.
    horasJugadas: resena?.horasJugadas || 0, // Horas que el usuario ha jugado al juego.
    dificultad: resena?.dificultad || 'Normal', // Dificultad percibida del juego.
    recomendaria: resena?.recomendaria ?? true // Si el usuario recomendaría el juego.
  });

  // Efecto para cargar la lista de juegos si no se ha proporcionado un juegoId.
  // Esto es útil cuando el formulario se usa para crear una reseña y el usuario debe seleccionar el juego.
  useEffect(() => {
    if (!juegoId) {
      const cargarJuegos = async () => {
        try {
          const res = await getJuegos(); // Llama a la API para obtener todos los juegos.
          setJuegos(res.data); // Almacena los juegos en el estado.
        } catch (error) {
          console.error('Error al cargar juegos:', error); // Manejo de errores.
        }
      };
      cargarJuegos();
    }
  }, [juegoId]); // Se ejecuta solo cuando juegoId cambia.

  // Manejador para el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recarga de página).
    onSuccess(formData); // Llama a la función onSuccess con los datos actuales del formulario.
  };

  return (
    // Formulario principal con estilos Tailwind CSS.
    <form onSubmit={handleSubmit} className="space-y-4 text-[#b3b3b3]">
      {/* Campo de selección de juego: Solo se muestra si no se ha proporcionado un juegoId (es decir,
          si se está creando una reseña y el juego no está preseleccionado). */}
      {!juegoId && (
        <div>
          <label htmlFor="juegoId" className="block font-medium mb-1 text-white">Juego</label>
          <select
            id="juegoId"
            value={formData.juegoId}
            onChange={(e) => setFormData({ ...formData, juegoId: e.target.value })} // Actualiza el juegoId en el estado.
            className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#2f2f2f] rounded text-white focus:outline-none focus:border-[#e50914]"
            required // Campo obligatorio.
          >
            <option value="">Selecciona un juego</option> {/* Opción por defecto */}
            {juegos.map((juego) => (
              <option key={juego._id} value={juego._id}>
                {juego.titulo} {/* Muestra el título del juego */}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Campo para el nombre del usuario */}
      <div>
        <label htmlFor="usuario" className="block font-medium mb-1 text-white">Tu Nombre</label>
        <input
          type="text"
          id="usuario"
          value={formData.usuario}
          onChange={(e) => setFormData({ ...formData, usuario: e.target.value })} // Actualiza el nombre de usuario.
          className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#2f2f2f] rounded text-white focus:outline-none focus:border-[#e50914]"
          placeholder="Ej. Juan Pérez"
          required // Campo obligatorio.
        />
      </div>

      {/* Componente StarRating para la puntuación */}
      <div>
        <label className="block font-medium mb-2 text-white">Puntuación</label>
        <StarRating
          rating={formData.puntuacion}
          onRatingChange={(val) => setFormData({ ...formData, puntuacion: val })} // Actualiza la puntuación.
        />
      </div>

      {/* Campo de texto para la reseña */}
      <div>
        <label htmlFor="textoReseña" className="block font-medium mb-1 text-white">Reseña</label>
        <textarea
          id="textoReseña"
          name="textoReseña"
          value={formData.textoReseña}
          onChange={(e) => setFormData({ ...formData, textoReseña: e.target.value })} // Actualiza el texto de la reseña.
          rows="4"
          className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#2f2f2f] rounded text-white focus:outline-none focus:border-[#e50914]"
          required // Campo obligatorio.
        />
      </div>

      {/* Contenedor para Horas Jugadas y Dificultad, organizado en una cuadrícula */}
      <div className="grid grid-cols-2 gap-4">
        {/* Campo para las horas jugadas */}
        <div>
          <label htmlFor="horasJugadas" className="block mb-1 text-white">Horas Jugadas</label>
          <input
            type="number"
            id="horasJugadas"
            value={formData.horasJugadas}
            onChange={(e) => setFormData({ ...formData, horasJugadas: e.target.value })} // Actualiza las horas jugadas.
            className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#2f2f2f] rounded text-white focus:outline-none focus:border-[#e50914]"
          />
        </div>
        {/* Campo de selección para la dificultad */}
        <div>
          <label htmlFor="dificultad" className="block mb-1 text-white">Dificultad</label>
          <select
            id="dificultad"
            value={formData.dificultad}
            onChange={(e) => setFormData({ ...formData, dificultad: e.target.value })} // Actualiza la dificultad.
            className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#2f2f2f] rounded text-white focus:outline-none focus:border-[#e50914]"
          >
            <option>Fácil</option>
            <option>Normal</option>
            <option>Difícil</option>
          </select>
        </div>
      </div>

      {/* Checkbox para recomendar el juego */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="recomendaria"
          checked={formData.recomendaria}
          onChange={(e) => setFormData({ ...formData, recomendaria: e.target.checked })} // Actualiza el estado del checkbox.
          className="w-5 h-5 accent-[#e50914]" // Estilo para el color del checkbox.
        />
        <label htmlFor="recomendaria" className="text-white">¿Lo recomendarías?</label>
      </div>

      {/* Botón de envío del formulario */}
      <Button type="submit" className="w-full bg-[#e50914] hover:bg-[#f40612] text-white font-bold py-2 rounded transition-colors">
        {resena ? 'Actualizar Reseña' : 'Publicar Reseña'} {/* Texto dinámico según si se edita o crea. */}
      </Button>
    </form>
  );
};

export default FormularioResena;