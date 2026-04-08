const express = require("express");
const router = express.Router();
const axios = require("axios");

// Tu clave de TMDB (asegúrate de que esté en tu archivo .env)
const TMDB_API_KEY =
  process.env.TMDB_API_KEY || "592645d02224a086ee675ff498e545ca";
const BASE_URL = "https://api.themoviedb.org/3";

// --- RUTA DE BÚSQUEDA ---
// Esta ruta responderá a: GET http://localhost:5001/api/movies/search?query=...
router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.json([]);
  }

  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "es-ES",
        query: query,
        include_adult: false,
      },
    });

    // Enviamos los resultados al frontend
    res.json(response.data.results);
  } catch (error) {
    console.error("Error al buscar en TMDB:", error.message);
    res.status(500).json({ message: "Error al realizar la búsqueda" });
  }
});

// --- RUTA DE POPULARES (Si no la tenías) ---
router.get("/popular", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY, language: "es-ES" },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener populares" });
  }
});

// --- RUTA DE DETALLES ---
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY, language: "es-ES" },
    });
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Película no encontrada" });
  }
});

module.exports = router;
