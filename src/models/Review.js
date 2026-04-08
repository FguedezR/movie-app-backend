const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ref al modelo de Usuario
      required: true,
    },
    movieId: {
      type: String, // ID de TMDB (ej: "550")
      required: true,
    },
    movieTitle: {
      type: String,
      required: true, // guardar el título para facilitar la moderación
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // estado inicial siempre pendiente
    },
  },
  { timestamps: true },
); // da createdAt y updatedAt automáticamente

module.exports = mongoose.model("Review", reviewSchema, "reviews");
