const express = require('express'); // Importa Express
const router = express.Router(); // Crea un enrutador de Express
const juegoController = require('../controllers/juegoController'); // Importa el controlador de Juegos

// Rutas CRUD para Juegos (Endpoints: /api/juegos)

// POST /api/juegos - Crear un nuevo juego
router.post('/', juegoController.crearJuego);

// GET /api/juegos - Obtener todos los juegos
router.get('/', juegoController.obtenerJuegos);

// GET /api/juegos/:id - Obtener un juego por su ID
router.get('/:id', juegoController.obtenerJuegoPorId);

// PUT /api/juegos/:id - Actualizar un juego por su ID
router.put('/:id', juegoController.actualizarJuego);

// DELETE /api/juegos/:id - Eliminar un juego por su ID
router.delete('/:id', juegoController.eliminarJuego);

// Exporta el router para usarlo en app.js
module.exports = router;
