require('dotenv').config(); // Carga las variables de entorno del archivo .env

const express = require('express'); // Importa el framework Express para crear el servidor
const mongoose = require('mongoose'); // Importa Mongoose para manejar MongoDB
const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Define el puerto desde .env o 3000 por defecto
const MONGODB_URL = process.env.MONGODB_URL; // Obtiene la URL de conexión a MongoDB desde .env

app.use(express.json()); // Permite que Express entienda solicitudes con formato JSON

// CONEXIÓN CON LA BD
mongoose.connect(MONGODB_URL) // Intenta conectar con MongoDB usando la URL
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas'); // Mensaje si la conexión es exitosa
    })
    .catch(err => {
        console.log('Error de conexión', err.message); // Mensaje si ocurre un error
        process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
    })

// RUTAS
const juegoRoutes = require('./routes/juegoRoutes') // Importa las rutas de juegos
app.use('/api/juegos', juegoRoutes) // Asocia las rutas de juegos al endpoint /api/juegos

const resenasRoutes = require('./routes/resenaRoutes') // Importa las rutas de reseñas
app.use('/api/resenas', resenasRoutes) // Asocia las rutas de reseñas al endpoint /api/resenas

app.listen(PORT, () => {
    console.log(`Servidor Corriendo en http://localhost:${PORT}`) // Inicia el servidor y muestra el puerto
})
