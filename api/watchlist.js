const express = require("express");
const router = express.Router();
const Watchlist = require("../src/models/Watchlist");
const authMiddleware = require("../src/middleware/auth.middleware");

/**
 * @route   POST /api/watchlist/toggle
 * @desc    Añadir o quitar una película de la lista del usuario
 * @access  Privado (Requiere Token)
 */
router.post("/toggle", authMiddleware, async (req, res) => {
  const { movieId, title, posterPath, type } = req.body;

  try {
    // buscamos si ya existe la película para este usuario
    const exists = await Watchlist.findOne({ userId: req.user.id, movieId });

    if (exists) {
      // si existe, la quitamos (Toggle Off)
      await Watchlist.findByIdAndDelete(exists._id);
      return res.json({ message: "Eliminada de tu lista", added: false });
    }

    // si no existe, la creamos (Toggle On)
    const newItem = new Watchlist({
      userId: req.user.id,
      movieId,
      title,
      posterPath,
      type: type || "movie",
    });

    await newItem.save();
    res.json({ message: "Agregada a tu lista", added: true });
  } catch (err) {
    console.error("Error en Watchlist Toggle:", err);
    res.status(500).json({ message: "Error al actualizar la lista" });
  }
});

/**
 * @route   GET /api/watchlist
 * @desc    Obtener todas las películas guardadas del usuario autenticado
 * @access  Privado (Requiere Token)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    // items y los ordenamos por lo más reciente
    const list = await Watchlist.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener la lista" });
  }
});

module.exports = router;
