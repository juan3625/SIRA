const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const nuevoUsuario = await authService.registrarUsuario({ nombre, correo, password, rol });

    return res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      data: nuevoUsuario,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const resultado = await authService.login({ correo, password });

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: resultado,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
