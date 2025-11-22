import Button from '../common/Button.jsx';
import StarRating from '../common/StarRating.jsx';

/**
 * Componente TarjetaResena
 *
 * Este componente muestra una reseña individual de un juego.
 * Incluye información del juego, el usuario que la escribió, la calificación,
 * el texto de la reseña, detalles adicionales como dificultad y horas jugadas,
 * y botones para editar o eliminar la reseña.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.resena - Objeto que contiene los datos de la reseña.
 * @param {function} props.onEdit - Función de callback para manejar la edición de la reseña.
 * @param {function} props.onDelete - Función de callback para manejar la eliminación de la reseña.
 */
const TarjetaResena = ({ resena, onEdit, onDelete }) => {
  return (
    // Contenedor principal de la tarjeta de reseña
    <div className="bg-[#181818] rounded-lg shadow-lg p-6 border border-[#2f2f2f] hover:border-[#404040] transition-colors">
      {/* Sección superior: Información del juego/usuario y calificación */}
      <div className="flex justify-between items-start mb-4">
        {/* Información del Juego y Usuario */}
        <div>
          {/* Título del juego (si está disponible a través de populate) */}
          {resena.juegoId && resena.juegoId.titulo && (
            <h3 className="text-xl font-bold text-white mb-1">
              {resena.juegoId.titulo}
            </h3>
          )}
          {/* Nombre del usuario y fecha de creación de la reseña */}
          <div className="flex items-center gap-2 text-sm text-[#b3b3b3]">
            <span className="font-medium text-white">{resena.usuario || 'Usuario'}</span>
            <span>•</span>
            <span>{new Date(resena.createdAt).toLocaleDateString()}</span> {/* Formatea la fecha */}
          </div>
        </div>

        {/* Calificación con Estrellas */}
        {/* Muestra la puntuación de la reseña utilizando el componente StarRating */}
        <StarRating rating={resena.puntuacion} />
      </div>

      {/* Contenido de la Reseña */}
      {/* Párrafo que contiene el texto principal de la reseña */}
      <p className="text-[#e5e5e5] mb-4 leading-relaxed">
        {resena.textoReseña}
      </p>

      {/* Detalles Adicionales (Recomendación, Dificultad, Horas) */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        {/* Indicador de recomendación (con icono) */}
        <div className={`flex items-center gap-1 font-medium ${resena.recomendaria ? 'text-green-500' : 'text-red-500'}`}>
          {resena.recomendaria ? (
            <>
              {/* Icono de pulgar arriba para "Recomendado" */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Recomendado
            </>
          ) : (
            <>
              {/* Icono de "no recomendado" */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              No recomendado
            </>
          )}
        </div>

        {/* Dificultad del juego (si está definida) */}
        {resena.dificultad && (
          <div className="text-[#b3b3b3]">
            Dificultad: <span className="text-white">{resena.dificultad}</span>
          </div>
        )}

        {/* Horas jugadas (si son mayores que 0) */}
        {resena.horasJugadas > 0 && (
          <div className="text-[#b3b3b3]">
            Tiempo jugado: <span className="text-white">{resena.horasJugadas}h</span>
          </div>
        )}
      </div>

      {/* Botones de Acción (Editar/Eliminar) */}
      {/* Contenedor para los botones de acción, alineados a la derecha */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[#2f2f2f]">
        {/* Botón para editar la reseña */}
        <Button
          onClick={() => onEdit(resena)} // Llama a onEdit con el objeto de la reseña
          variant="secondary"
          className="text-sm py-1.5 px-4"
        >
          Editar
        </Button>
        {/* Botón para eliminar la reseña */}
        <Button
          onClick={() => onDelete(resena._id)} // Llama a onDelete con el ID de la reseña
          variant="danger"
          className="text-sm py-1.5 px-4"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default TarjetaResena;