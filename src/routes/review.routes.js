const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/', authMiddleware, reviewController.createReview);


router.get('/me', authMiddleware, reviewController.getMyReviews);


router.get('/pending', authMiddleware, reviewController.getPendingReviews);


router.put('/approve/:id', authMiddleware, reviewController.approveReview);



router.get('/movie/:movieId', reviewController.getMovieReviews); 


router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;