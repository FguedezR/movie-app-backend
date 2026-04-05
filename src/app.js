const express = require("express");
const cors = require("cors");
const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
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
// 1. Importamos el enrutador central
const apiRoutes = require('./routes/index');

// enrutador con prefijo /api
// rutas dentro de index.js empiecen por /api
app.use('/api', apiRoutes);

module.exports = app;