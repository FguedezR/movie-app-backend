const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.get("/search", movieController.searchMovies);
router.get("/popular", movieController.getPopular);
router.get("/:id", movieController.getMovieById);

module.exports = router;
