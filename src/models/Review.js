const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Referencia al modelo de Usuario
    required: true 
  },
  movieId: { 
    type: String, // ID de TMDB (ej: "550")
    required: true 
  },
  movieTitle: { 
    type: String, 
    required: true // Guardamos el título para facilitar la moderación
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true,
    trim: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' // Estado inicial siempre pendiente
  }
}, { timestamps: true }); // Nos da createdAt y updatedAt automáticamente

module.exports = mongoose.model('Review', reviewSchema, 'reviews');