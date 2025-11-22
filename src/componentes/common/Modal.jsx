```javascript
// Componente Modal reutilizable para mostrar contenido superpuesto.
// Recibe las siguientes props:
// - isOpen: Booleano que controla si el modal está visible o no.
// - onClose: Función que se ejecuta cuando se solicita cerrar el modal.
// - children: Contenido que se renderizará dentro del cuerpo del modal.
// - title: El título que se mostrará en la cabecera del modal.
const Modal = ({ isOpen, onClose, children, title }) => {
  // Si la prop 'isOpen' es falsa, el modal no se renderiza y devuelve null.
  if (!isOpen) return null;

  return (
    // Contenedor principal del modal:
    // - 'fixed inset-0': Fija el modal en toda la pantalla.
    // - 'bg-black bg-opacity-50': Fondo oscuro semitransparente.
    // - 'flex items-center justify-center': Centra el contenido del modal.
    // - 'z-50': Asegura que el modal esté por encima de otros elementos.
    // - 'p-4': Padding general para el contenedor.
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Contenedor del contenido del modal: */}
      {/* - 'bg-[#181818]': Color de fondo oscuro. */}
      {/* - 'rounded-lg': Bordes redondeados. */}
      {/* - 'max-w-lg w-full': Ancho máximo de 512px, ocupando todo el ancho disponible hasta ese límite. */}
      {/* - 'max-h-screen overflow-y-auto': Altura máxima de la pantalla con scroll si el contenido es muy largo. */}
      <div className="bg-[#181818] rounded-lg max-w-lg w-full max-h-screen overflow-y-auto">
        {/* Cabecera del modal: */}
        {/* - 'flex justify-between items-center': Alinea el título y el botón de cierre. */}
        {/* - 'p-4': Padding interno. */}
        {/* - 'border-b border-[#2f2f2f]': Borde inferior para separar la cabecera del cuerpo. */}
        <div className="flex justify-between items-center p-4 border-b border-[#2f2f2f]">
          {/* Título del modal: */}
          {/* - 'text-xl font-bold text-white': Estilo del texto del título. */}
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {/* Botón de cierre del modal: */}
          {/* - 'onClick={onClose}': Llama a la función 'onClose' cuando se hace clic. */}
          {/* - 'text-[#b3b3b3] hover:text-white text-2xl': Estilo del botón de cierre (una 'x'). */}
          <button
            onClick={onClose}
            className="text-[#b3b3b3] hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        {/* Cuerpo del modal: */}
        {/* - 'p-4': Padding interno. */}
        {/* - {children}: Aquí se renderiza el contenido pasado como prop. */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
```