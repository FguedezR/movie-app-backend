const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No hay token, autorización denegada" });
  }

  // extraemos el token eliminando "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos los datos del usuario en la petición
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};
