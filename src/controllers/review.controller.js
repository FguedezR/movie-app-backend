const Review = require("../models/Review");

// CREAR RESEÑA
exports.createReview = async (req, res) => {
  try {
    const { movieId, movieTitle, rating, comment } = req.body;

    // El ID del usuario lo sacamos del Token (que procesaremos en un middleware)
    const userId = req.user.id;

    const newReview = new Review({
      userId,
      movieId,
      movieTitle,
      rating,
      comment,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Reseña enviada. Pendiente de aprobación." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al enviar la reseña", error: error.message });
  }
};

// OBTENER RESEÑAS APROBADAS DE UNA PELÍCULA
exports.getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId, status: "approved" })
      .populate("userId", "username avatar") // Traemos el nombre y foto del autor
      .sort({ createdAt: -1 }); // Las más nuevas primero

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    // El ID viene del token gracias al middleware
    const reviews = await Review.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus reseñas" });
  }
};