const app = require("../src/app");
const connectDB = require("../src/config/db");

// Conectamos a la base de datos de manera global para Vercel
connectDB();

module.exports = app;
