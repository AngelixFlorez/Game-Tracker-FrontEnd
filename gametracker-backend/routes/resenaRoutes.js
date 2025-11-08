const express = require('express'); // Importa Express
const router = express.Router(); // Crea un enrutador de Express
const resenaController = require('../controllers/resenaController'); // Importa el controlador de Reseñas

// Rutas CRUD para Reseñas (Endpoints: /api/resenas)

// POST /api/resenas - Crear una nueva reseña
router.post('/', resenaController.crearResena);

// GET /api/resenas - Obtener todas las reseñas
router.get('/', resenaController.obtenerResenas);

// GET /api/resenas/:id - Obtener una reseña por su ID
router.get('/:id', resenaController.obtenerResenaPorId);

// PUT /api/resenas/:id - Actualizar una reseña por su ID
router.put('/:id', resenaController.actualizarResena);

// DELETE /api/resenas/:id - Eliminar una reseña por su ID
router.delete('/:id', resenaController.eliminarResena);

// GET /api/resenas/juego/:juegoId
router.get('/juego/:juegoId', resenaController.obtenerResenasPorJuego);

// Exporta el router para usarlo en app.js
module.exports = router;
