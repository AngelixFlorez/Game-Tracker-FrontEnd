// Componente de Input reutilizable
// Este componente de React proporciona un campo de entrada de texto genérico y reutilizable.
// Acepta varias props para personalizar su comportamiento y apariencia.
const Input = ({
  label, // Texto de la etiqueta que se mostrará encima del campo de entrada. Opcional.
  type = "text", // Tipo de entrada (ej. "text", "password", "email", "number"). Por defecto es "text".
  name, // El atributo 'name' del campo de entrada, útil para formularios y accesibilidad.
  value, // El valor actual del campo de entrada. Controlado por el componente padre.
  onChange, // Función de callback que se ejecuta cuando el valor del campo de entrada cambia.
  placeholder, // Texto de marcador de posición que se muestra cuando el campo está vacío.
  required = false // Booleano que indica si el campo es obligatorio. Por defecto es false.
}) => {
  return (
    // Contenedor principal del componente con espaciado vertical.
    <div className="space-y-1">
      {/* Renderiza la etiqueta solo si la prop 'label' está presente */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {/* El elemento de entrada HTML */}
      <input
        type={type} // Establece el tipo de entrada
        id={name} // Asocia el input con la etiqueta (si existe) para accesibilidad
        name={name} // Establece el nombre del input
        value={value} // Establece el valor actual del input
        onChange={onChange} // Maneja los cambios en el input
        placeholder={placeholder} // Establece el texto de marcador de posición
        required={required} // Establece si el campo es obligatorio
        // Clases de Tailwind CSS para estilizar el campo de entrada
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// Exporta el componente Input para que pueda ser utilizado en otras partes de la aplicación.
export default Input;