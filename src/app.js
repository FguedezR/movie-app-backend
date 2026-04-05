const express = require("express");
const cors = require("cors");
const app = express();

// Configuración de CORS más robusta
app.use(
  cors({
    origin: "http://localhost:5173", // La URL de tu frontend con Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<h1>🎬 API de Películas - Backend Activo</h1><p>Usa /api/health para verificar el estado.</p>",
  );
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando correctamente" });
});

// Aquí importaremos más adelante las rutas:
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/movies', require('./routes/movie.routes'));

module.exports = app;
