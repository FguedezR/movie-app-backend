const express = require("express");
const router = express.Router();
const axios = require("axios");


const TMDB_API_KEY =
  process.env.TMDB_API_KEY || "592645d02224a086ee675ff498e545ca";
const BASE_URL = "https://api.themoviedb.org/3";



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

    
    res.json(response.data.results);
  } catch (error) {
    console.error("Error al buscar en TMDB:", error.message);
    res.status(500).json({ message: "Error al realizar la búsqueda" });
  }
});


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





router.use("/proxy", async (req, res) => {
  
  const proxyPath = req.path; 
  
  try {
    const response = await axios({
      method: req.method,
      url: `${BASE_URL}${proxyPath}`,
      params: { api_key: TMDB_API_KEY, language: "es-ES", ...req.query },
      data: req.body
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: "Error al contactar a TMDB" });
  }
});

module.exports = router;
