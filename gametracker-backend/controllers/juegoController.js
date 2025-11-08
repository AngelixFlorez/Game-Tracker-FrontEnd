const Juego = require('../models/Juego'); // Importa el modelo Juego de Mongoose

// Casos de éxito:
// 201 = Se creó correctamente (POST - Crear)
// 200 = Operación exitosa (GET / PUT / DELETE)

// Casos de error:
// 400 = Datos inválidos enviados por el cliente
// 404 = Recurso no encontrado
// 500 = Error interno del servidor

// C - Crear JUEGO
exports.crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body); // Crea un nuevo objeto Juego con los datos enviados en el body
    await nuevoJuego.save(); // Guarda el juego en la base de datos
    res.status(201).json(nuevoJuego); // Retorna el juego creado con código 201 (creado)
  } catch (error) {
    res.status(400).json({ // Si hay error, retorna código 400 y mensaje
      error: 'Error al agregar juego. Verifique campos',
      details: error.message
    });
  }
};

// R - Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find(); // Obtiene todos los juegos de la base de datos
    res.status(200).json(juegos); // Retorna los juegos con código 200 (OK)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al obtener juegos' }); // Error servidor
  }
};

// R - Obtener juego por ID
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id); // Busca un juego por su ID

    if (!juego) {
      return res.status(404).json({ msg: 'Juego no encontrado' }); // Si no existe, retorna 404
    }

    res.status(200).json(juego); // Si existe, retorna el juego con código 200
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el juego' }); // Error interno al buscar
  }
};

// U - Actualizar juego
exports.actualizarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(
      req.params.id, // ID del juego a actualizar
      req.body, // Nuevos datos para actualizar
      { new: true, runValidators: true } // Retorna el juego actualizado y valida campos
    );

    if (!juego) {
      return res.status(404).json({ msg: 'Juego no encontrado para actualizar' }); // No existe
    }

    res.status(200).json(juego); // Retorna el juego actualizado con código 200
  } catch (error) {
    res.status(400).json({ // Error en los datos enviados
      error: 'Error al actualizar el juego',
      details: error.message
    });
  }
};

// D - Eliminar juego
exports.eliminarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id); // Busca y elimina el juego por ID

    if (!juego) {
      return res.status(404).json({ msg: 'Juego no encontrado para eliminar' }); // No existe
    }

    res.status(200).json({ msg: 'Juego eliminado exitosamente' }); // Confirmación de eliminación
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el juego' }); // Error interno al eliminar
  }
};