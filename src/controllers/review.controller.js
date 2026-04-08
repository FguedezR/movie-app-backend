const Review = require("../models/Review");
const mongoose = require("mongoose");

// ASEGÚRATE DE QUE EL NOMBRE SEA EXACTAMENTE: getPendingReviews

exports.createReview = async (req, res) => {
  try {
    const { movieId, movieTitle, rating, comment } = req.body;

    const newReview = new Review({
      movieId,
      movieTitle,
      rating,
      comment,
      userId: req.user.id,
      status: "pending"
    });

    await newReview.save();
    res.status(201).json({ message: "Reseña creada exitosamente", review: newReview });
  } catch (error) {
    console.error("Error al crear reseña:", error);
    res.status(500).json({ message: "Error al crear la reseña" });
  }
};

exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Opcionalmente ordenar por más reciente
    res.json(reviews);
  } catch (error) {
    console.error("Error al obtener mis reseñas:", error);
    res.status(500).json({ message: "Error al obtener mis reseñas" });
  }
};

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
    // filtrar por movieId Y por status 'approved'
    const reviews = await Review.find({
      movieId: movieId,
      status: "approved",
    }).populate("userId", "username avatar");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.json({ message: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reseña" });
  }
};
