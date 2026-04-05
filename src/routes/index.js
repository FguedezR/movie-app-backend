const express = require("express");
const router = express.Router();
const movieRoutes = require("./movie.routes");

router.use("/movies", movieRoutes); // crea /api/movies

module.exports = router;