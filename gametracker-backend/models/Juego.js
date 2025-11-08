const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    unique: true
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio']
  },
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria']
  },
  añoLanzamiento: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio'],
    min: 1950,
    max: new Date().getFullYear() + 5
  },
  desarrollador: {
    type: String,
    required: [true, 'El desarrollador es obligatorio']
  },
  imagenPortada: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=Sin+Portada'
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  completado: {
    type: Boolean,
    default: false
  },
  horasJugadas: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Juego', JuegoSchema);
