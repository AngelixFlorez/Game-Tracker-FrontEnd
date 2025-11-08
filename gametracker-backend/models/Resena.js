const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResenaSchema = new Schema({
  juegoId: {
    type: Schema.Types.ObjectId,
    ref: 'Juego',
    required: true
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  textoReseña: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio']
  },
  horasJugadas: {
    type: Number,
    default: 0,
    min: 0
  },
  dificultad: {
    type: String,
    enum: ['Fácil', 'Normal', 'Difícil'],
    default: 'Normal'
  },
  recomendaria: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resena', ResenaSchema);