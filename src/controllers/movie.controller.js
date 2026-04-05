const tmdbService = require('../services/tmdb.service');

const getPopular = async (req, res) => {
  try {
    const movies = await tmdbService.getPopularMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPopular };