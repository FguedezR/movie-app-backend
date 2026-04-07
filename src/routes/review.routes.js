const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Ruta para obtener reseñas (Pública)
router.get("/:movieId", reviewController.getMovieReviews);

// Ruta para crear reseña (Protegida con Token)
router.post("/", authMiddleware, reviewController.createReview);

router.get("/me", authMiddleware, reviewController.getUserReviews);

module.exports = router;
