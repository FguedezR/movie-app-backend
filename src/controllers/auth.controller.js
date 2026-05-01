const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (!password) {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }

    if (userExists) {
      return res
        .status(400)
        .json({ message: "El usuario o email ya está registrado" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error en Registro:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error en Login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};


module.exports = {
  register,
  login,
};
