const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware');

// crear reseña
router.post('/', authMiddleware, reviewController.createReview);

// obtener mis reseñas (PÚBLICO PARA EL USUARIO AUTENTICADO)
router.get('/me', authMiddleware, reviewController.getMyReviews);

// obtener pendientes (ADMIN)
router.get('/pending', authMiddleware, reviewController.getPendingReviews);

// aprobar (ADMIN)
router.put('/approve/:id', authMiddleware, reviewController.approveReview);

// obtener aprobadas por película (PÚBLICO)
// para Details.jsx
router.get('/movie/:movieId', reviewController.getMovieReviews); 

// eliminar (ADMIN)
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;