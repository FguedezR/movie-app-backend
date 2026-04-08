const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("Error de conexión:", error.message);
    process.exit(1);
  }
};

// para comprobar conexión/nombre a bbdd
mongoose.connect(process.env.MONGO_URI)
  .then((con) => {
    console.log(`✅ Conectado a la DB: "${con.connection.name}"`);
  })
  .catch((err) => console.log("❌ Error:", err));

module.exports = connectDB;