const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "No hay token, permiso denegado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Añadimos los datos del usuario a la petición
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};
