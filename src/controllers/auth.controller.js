const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. REGISTRO DE USUARIOS
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (!password) {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }

    if (userExists) {
      return res
        .status(400)
        .json({ message: "El usuario o email ya está registrado" });
    }

    // ENCRIPTAR CONTRASEÑA (Seguridad)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear y guardar el nuevo usuario
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

// 2. INICIO DE SESIÓN (LOGIN)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por su email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Comparar la contraseña enviada con la encriptada en la BD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // CREAR EL TOKEN (durará 24 horas)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // Enviar respuesta al frontend con los datos del usuario y el token
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

// 3. EXPORTAR LAS FUNCIONES (Para que auth.routes.js las encuentre)
module.exports = {
  register,
  login,
};
