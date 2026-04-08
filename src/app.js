const express = require("express");
const cors = require("cors");
const app = express();
const watchlistRoutes = require("./routes/watchlist.routes");

// 1. MIDDLEWARES (Configuración básica)
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, "http://localhost:5173"] 
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());

// 2. IMPORTACIÓN DE RUTAS
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movie.routes");
const reviewRoutes = require('./routes/review.routes');

// 3. REGISTRO DE RUTAS
app.get("/", (req, res) => {
  res.send("<h1>🎬 API de Películas - Backend Activo</h1>");
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/api/watchlist", watchlistRoutes);

// 4. MANEJO DE ERRORES (Debe ir al final de todas las rutas)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

module.exports = app;