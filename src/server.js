require("dotenv").config();
require("./models/User");
require("./models/Review");
require("./models/Watchlist");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en el puerto http://localhost:${PORT}`);
});