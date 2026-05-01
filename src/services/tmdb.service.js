const axios = require("axios");


const GENRES = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familia",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia ficción",
  10770: "Película de TV",
  53: "Suspense",
  10752: "Bélica",
  37: "Oeste",
};


const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  
  poster: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sin+Imagen",
  
  backdrop: movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null,
  year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
  genres: movie.genre_ids
    ? movie.genre_ids.map((id) => GENRES[id]).filter(Boolean)
    : [],
  adult: movie.adult ? "+18" : "TP",
  overview: movie.overview,
});


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
    
    return response.data.results.map(formatMovie);
  } catch (error) {
    console.error("Error en TMDB Service (Popular):", error.message);
    throw new Error("No se pudieron obtener las películas populares");
  }
};

const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/search/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: query,
          language: "es-ES",
          page: 1,
        },
      },
    );
    
    return response.data.results.map(formatMovie);
  } catch (error) {
    console.error("Error en TMDB Service (Search):", error.message);
    throw new Error("Error en la búsqueda de TMDB");
  }
};

const getMovieById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/${id}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "es-ES",
          append_to_response: "videos,recommendations",
        },
      },
    );

    const movie = response.data;

    const trailer = movie.videos.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    );

    return {
      ...formatMovie(movie),
      overview: movie.overview,
      runtime: movie.runtime, 
      trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
      recommendations: movie.recommendations.results
        .map(formatMovie)
        .slice(0, 6),
    };
  } catch (error) {
    throw new Error("No se encontró la película");
  }
};

module.exports = { getPopularMovies, searchMovies, getMovieById };
