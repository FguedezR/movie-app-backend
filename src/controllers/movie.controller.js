const tmdbService = require("../services/tmdb.service");

const getPopular = async (req, res) => {
  try {
    const movies = await tmdbService.getPopularMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchMovies = async (req, res) => {
  const { query } = req.query; 
  try {
    const movies = await tmdbService.searchMovies(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await tmdbService.getMovieById(id);
    res.json(movie);
  } catch (error) {
    res.status(404).json({ message: "Película no encontrada" });
  }
};

module.exports = { getPopular, searchMovies, getMovieById };
