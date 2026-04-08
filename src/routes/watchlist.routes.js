const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");
const authMiddleware = require("../middleware/auth.middleware");

// GET: Obtener la lista del usuario
// URL: http://localhost:5001/api/watchlist/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener la lista" });
  }
});

// POST: Agregar o quitar de la lista (Toggle)
// URL: http://localhost:5001/api/watchlist/toggle
router.post("/toggle", authMiddleware, async (req, res) => {
  const { movieId, title, posterPath, type } = req.body;
  try {
    const exists = await Watchlist.findOne({ userId: req.user.id, movieId });

    if (exists) {
      await Watchlist.findByIdAndDelete(exists._id);
      return res.json({ added: false, message: "Eliminado de tu lista" });
    }

    const newItem = new Watchlist({
      userId: req.user.id,
      movieId,
      title,
      posterPath,
      type: type || "movie",
    });
    await newItem.save();
    res.json({ added: true, message: "Agregada a tu lista" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
