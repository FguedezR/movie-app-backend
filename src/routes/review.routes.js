const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware');

// obtener pendientes (ADMIN)
router.get('/pending', authMiddleware, reviewController.getPendingReviews);

// aprobar (ADMIN)
router.put('/approve/:id', authMiddleware, reviewController.approveReview);

// obtener aprobadas por película (PÚBLICO)
// para Details.jsx
router.get('/movie/:movieId', reviewController.getMovieReviews); 

module.exports = router;