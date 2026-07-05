const Usuario = require("../models/usuario.model");

const listarUsuarios = async () => {
  return await Usuario.findAll();
};

const obtenerUsuarioPorId = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    const error = new Error("El usuario no existe");
    error.statusCode = 404;
    throw error;
  }
  return usuario;
};

const actualizarUsuario = async (id, datos) => {
  const usuario = await obtenerUsuarioPorId(id);
  await usuario.update(datos);
  return usuario;
};

const eliminarUsuario = async (id) => {
  const usuario = await obtenerUsuarioPorId(id);
  await usuario.destroy();
};

module.exports = {
  listarUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
