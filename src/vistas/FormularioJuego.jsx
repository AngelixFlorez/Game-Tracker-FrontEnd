import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { crearJuego, obtenerJuegoPorId, actualizarJuego } from '../servicios/JuegoServicio';

const initialFormState = {
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: new Date().getFullYear(),
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false, // Requisito: Marcar juegos como completados
    horasJugadas: 0,   // Requisito: Registrar horas jugadas
};

const FormularioJuego = () => {
    // Hooks de React Router para obtener parámetros y navegar
    const { id } = useParams(); 
    const navigate = useNavigate();

    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState(initialFormState);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    // Determina si estamos creando o editando
    const isEditing = !!id; 
    
    // Opciones estáticas para campos select
    const generos = ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Simulación', 'Indie', 'Otro'];
    const plataformas = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Móvil', 'Otro'];

    // 1. Efecto para cargar datos en modo edición
    useEffect(() => {
        if (isEditing) {
            setCargando(true);
            obtenerJuegoPorId(id)
                .then(data => {
                    // Cargar los datos del juego en el estado
                    setFormData({
                        ...data,
                        // Mongoose devuelve un _id, pero lo necesitamos limpio para el PUT
                        _id: data._id 
                    });
                    setCargando(false);
                })
                .catch(err => {
                    setError('Error al cargar datos para edición.');
                    setCargando(false);
                    console.error(err);
                });
        }
    }, [id, isEditing]);


    // 2. Manejo de cambios en los inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            // Manejo especial para checkboxes y números
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
        setError(null);
    };


    // 3. Manejo de envío del formulario (Crear o Actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError(null);
        setMensaje(null);

        try {
            if (isEditing) {
                // Modo Edición: Llama al servicio de actualización
                await actualizarJuego(id, formData);
                setMensaje(`"${formData.titulo}" ha sido actualizado exitosamente.`);
            } else {
                // Modo Creación: Llama al servicio de creación
                await crearJuego(formData);
                setMensaje(`"${formData.titulo}" ha sido agregado a tu biblioteca.`);
                setFormData(initialFormState); // Limpia el formulario
            }
            // Después de un pequeño retraso, navega a la biblioteca
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (err) {
            // Manejo de errores de validación del Backend
            const errorMsg = err.details || 'Verifica que todos los campos obligatorios estén llenos y que el Backend esté corriendo.';
            setError(errorMsg);
            setCargando(false);
        }
    };

    if (isEditing && cargando) {
        return <div className="text-center p-8 text-xl font-semibold">Cargando datos del juego...</div>;
    }
    
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 border-b pb-2">
                {isEditing ? `📝 Editar: ${formData.titulo}` : '➕ Agregar Nuevo Juego'}
            </h1>

            {/* Mensajes de feedback */}
            {mensaje && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Éxito</p>
                    <p>{mensaje}</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}
            
            {/* Formulario principal */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6">
                
                {/* 1. Título y Desarrollador */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                        label="Título del Juego *" 
                        name="titulo" 
                        value={formData.titulo} 
                        onChange={handleChange} 
                        type="text"
                    />
                    <InputField 
                        label="Desarrollador *" 
                        name="desarrollador" 
                        value={formData.desarrollador} 
                        onChange={handleChange} 
                        type="text"
                    />
                </div>

                {/* 2. Género, Plataforma y Año */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SelectField
                        label="Género *"
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        options={generos}
                    />
                    <SelectField
                        label="Plataforma *"
                        name="plataforma"
                        value={formData.plataforma}
                        onChange={handleChange}
                        options={plataformas}
                    />
                    <InputField 
                        label="Año de Lanzamiento *" 
                        name="añoLanzamiento" 
                        value={formData.añoLanzamiento} 
                        onChange={handleChange} 
                        type="number"
                        min="1950" 
                        max={new Date().getFullYear() + 5}
                    />
                </div>

                {/* 3. URL de Portada y Horas Jugadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                        label="URL de la Imagen de Portada" 
                        name="imagenPortada" 
                        value={formData.imagenPortada} 
                        onChange={handleChange} 
                        type="url"
                    />
                    <InputField 
                        label="Horas Jugadas" 
                        name="horasJugadas" 
                        value={formData.horasJugadas} 
                        onChange={handleChange} 
                        type="number"
                        min="0"
                    />
                </div>

                {/* 4. Descripción */}
                <TextAreaField 
                    label="Descripción / Sinopsis *" 
                    name="descripcion" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                />

                {/* 5. Checkbox de Completado */}
                <div className="flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg">
                    <input 
                        type="checkbox" 
                        name="completado" 
                        checked={formData.completado} 
                        onChange={handleChange} 
                        id="completado"
                        className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="completado" className="text-gray-700 font-medium cursor-pointer">
                        Marcar como completado
                    </label>
                </div>
                
                {/* Botón de envío */}
                <button 
                    type="submit" 
                    disabled={cargando}
                    className={`w-full py-3 text-white font-bold rounded-lg transition duration-300 
                        ${cargando ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700 shadow-lg'}`}
                >
                    {cargando ? 'Procesando...' : (isEditing ? 'Guardar Cambios' : 'Agregar Juego a la Biblioteca')}
                </button>
            </form>
        </div>
    );
};

// --- Componentes Reutilizables para el Formulario ---

const InputField = ({ label, name, type = 'text', value, onChange, min, max }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 text-sm font-semibold text-gray-700">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            required={label.includes('*')}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
        />
    </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 text-sm font-semibold text-gray-700">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows="4"
            required={label.includes('*')}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 resize-none"
        ></textarea>
    </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 text-sm font-semibold text-gray-700">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="p-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 appearance-none"
        >
            <option value="" disabled>Selecciona una opción</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);


export default FormularioJuego;
