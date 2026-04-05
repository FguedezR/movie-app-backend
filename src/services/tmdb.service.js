const axios = require("axios");

const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/popular`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "es-ES",
          page: 1,
        },
      },
    );
    // Retornamos solo los resultados (el array de películas)
    return response.data.results;
  } catch (error) {
    console.error(
      "Error en TMDB Service:",
      error.response?.data || error.message,
    );
    throw new Error("No se pudieron obtener las películas de TMDB");
  }
};

module.exports = { getPopularMovies };
