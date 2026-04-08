const Review = require("../models/Review");
const mongoose = require("mongoose");

// ASEGÚRATE DE QUE EL NOMBRE SEA EXACTAMENTE: getPendingReviews
exports.getPendingReviews = async (req, res) => {
  try {
    console.log("--- DIAGNÓSTICO DE CONEXIÓN ---");
    console.log("DB Actual:", mongoose.connection.name);

    // 1. Forzamos búsqueda directa para saltar problemas de modelos
    const directReviews = await mongoose.connection.db
      .collection("reviews")
      .find({ status: "pending" })
      .toArray();

    console.log("Reseñas encontradas directamente:", directReviews.length);

    // 2. Búsqueda normal por modelo
    const pending = await Review.find({ status: "pending" }).populate(
      "userId",
      "username",
    );

    res.json(pending);
  } catch (error) {
    console.error("ERROR EN EL CONTROLADOR:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { status: "approved" },
      { returnDocument: "after" },
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "No se encontró la reseña" });
    }

    res.json({ message: "¡Reseña aprobada!", review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Error al aprobar la reseña" });
  }
};

exports.getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    // IMPORTANTE: Filtrar por movieId Y por status 'approved'
    const reviews = await Review.find({
      movieId: movieId,
      status: "approved",
    }).populate("userId", "username");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
