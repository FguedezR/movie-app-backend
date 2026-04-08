require('./models/User'); 
require('./models/Review');
require("dotenv").config();
// Importar el modelo de usuario primero

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
