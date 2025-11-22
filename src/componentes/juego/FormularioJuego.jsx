```javascript
import { useState, useEffect } from 'react';

/**
 * Componente FormularioJuego
 *
 * Este componente renderiza un formulario para crear o editar un juego.
 * Utiliza el estado local para manejar los datos del formulario y los props
 * para inicializar el formulario con datos de un juego existente (en caso de edición)
 * y para manejar el envío exitoso del formulario.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.juego - Objeto que contiene los datos de un juego existente para edición.
 *                                Si es null o undefined, el formulario se usa para crear un nuevo juego.
 * @param {function} props.onSuccess - Función de callback que se ejecuta cuando el formulario se envía exitosamente.
 *                                     Recibe los datos del formulario como argumento.
 */
const FormularioJuego = ({ juego, onSuccess }) => {
  // Estado inicial del formulario
  // Define los campos del formulario y sus valores iniciales.
  // 'imagenPortada' tiene un valor por defecto si no se proporciona uno.
  // 'estado' y 'horasJugadas' también tienen valores iniciales predefinidos.
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    descripcion: '',
    imagenPortada: 'https://via.placeholder.com/300x400?text=Sin+Portada',
    estado: 'no empezado',
    horasJugadas: 0
  });

  // Efecto para rellenar el formulario si se está editando un juego existente
  // Se ejecuta cada vez que la prop 'juego' cambia.
  // Si 'juego' tiene un valor (es decir, estamos en modo edición),
  // se actualiza el estado 'formData' con los datos del juego.
  useEffect(() => {
    if (juego) setFormData(juego);
  }, [juego]);

  // Manejador de cambios en los inputs del formulario
  // Esta función se llama cada vez que el valor de un campo del formulario cambia.
  // Actualiza el estado 'formData' con el nuevo valor del campo correspondiente.
  // Maneja específicamente los inputs de tipo 'checkbox' para su propiedad 'checked'.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData, // Copia todos los campos existentes del estado
      [name]: type === 'checkbox' ? checked : value // Actualiza solo el campo que cambió
    });
  };

  // Manejador de envío del formulario
  // Esta función se llama cuando el formulario es enviado (por ejemplo, al hacer clic en el botón de envío).
  // Previene el comportamiento por defecto del formulario (recarga de página).
  // Llama a la función 'onSuccess' pasada por props, enviándole los datos actuales del formulario.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    // El formulario principal con un manejador para el evento onSubmit y estilos Tailwind CSS.
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Contenedor para los campos del formulario, organizado en una cuadrícula responsiva */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Campo para el Título del Juego */}
        <div className="md:col-span-2"> {/* Ocupa dos columnas en pantallas medianas y grandes */}
          <label className="block text-sm font-semibold text-white mb-2">
            Título del Juego *
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required // Campo obligatorio
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
            placeholder="Ej: The Legend of Zelda"
          />
        </div>

        {/* Campo para el Género */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Género *
          </label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
            placeholder="Ej: Aventura, RPG"
          />
        </div>

        {/* Campo para la Plataforma */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Plataforma *
          </label>
          <input
            type="text"
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
            placeholder="Ej: PlayStation 5, PC"
          />
        </div>

        {/* Campo para el Año de Lanzamiento */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Año de Lanzamiento *
          </label>
          <input
            type="number"
            name="añoLanzamiento"
            value={formData.añoLanzamiento}
            onChange={handleChange}
            required
            min="1950" // Año mínimo permitido
            max={new Date().getFullYear() + 5} // Año máximo permitido (año actual + 5)
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
            placeholder="Ej: 2023"
          />
        </div>

        {/* Campo para el Desarrollador */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Desarrollador *
          </label>
          <input
            type="text"
            name="desarrollador"
            value={formData.desarrollador}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
            placeholder="Ej: Nintendo"
          />
        </div>

        {/* Campo para la Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-white mb-2">
            Descripción *
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows="4" // Número de filas visibles por defecto
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors resize-none"
            placeholder="Describe el juego..."
          />
        </div>

        {/* Campo para la URL de la Portada */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-white mb-2">
            URL de la Portada
          </label>
          <input
            type="url" // Tipo de input para URLs
            name="imagenPortada"
            value={formData.imagenPortada}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* Campo para las Horas Jugadas */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Horas Jugadas
          </label>
          <input
            type="number"
            name="horasJugadas"
            value={formData.horasJugadas}
            onChange={handleChange}
            min="0" // Valor mínimo permitido
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
            placeholder="0"
          />
        </div>

        {/* Campo de selección para el Estado del Juego */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Estado
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border-2 border-transparent focus:border-[#e50914] focus:outline-none transition-colors"
          >
            <option value="no empezado">No empezado</option>
            <option value="en progreso">En progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>
      </div>

      {/* Botón de envío del formulario */}
      {/* El texto del botón cambia dinámicamente dependiendo si se está creando o editando un juego. */}
      <button
        type="submit"
        className="w-full bg-[#e50914] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#f40612] transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
      >
        {juego ? '✓ Actualizar Juego' : '+ Crear Juego'}
      </button>
    </form>
  );
};

export default FormularioJuego;
```