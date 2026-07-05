const usuarioService = require("../services/usuario.service");

const listar = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    return res.status(200).json({
      success: true,
      message: "Usuarios obtenidos correctamente",
      data: usuarios,
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Usuario encontrado",
      data: usuario,
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const usuario = await usuarioService.actualizarUsuario(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Usuario actualizado correctamente",
      data: usuario,
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    await usuarioService.eliminarUsuario(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Usuario eliminado correctamente",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listar,
  obtenerPorId,
  actualizar,
  eliminar,
};
