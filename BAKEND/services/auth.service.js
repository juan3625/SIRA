const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

const SALT_ROUNDS = 10;

const registrarUsuario = async ({ nombre, correo, password, rol }) => {
  const existente = await Usuario.findOne({ where: { correo } });
  if (existente) {
    const error = new Error("El correo ya está registrado");
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const nuevoUsuario = await Usuario.create({
    nombre,
    correo,
    password: passwordHash,
    rol,
  });

  return nuevoUsuario; // el defaultScope ya excluye el password en la respuesta
};

const login = async ({ correo, password }) => {
  const usuario = await Usuario.scope("conPassword").findOne({ where: { correo } });

  if (!usuario) {
    const error = new Error("Correo o contraseña incorrectos");
    error.statusCode = 401;
    throw error;
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) {
    const error = new Error("Correo o contraseña incorrectos");
    error.statusCode = 401;
    throw error;
  }

  const access_token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.SECRET_KEY,
    {
      algorithm: process.env.ALGORITHM || "HS256",
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 30}m`,
    }
  );

  return {
    access_token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    },
  };
};

module.exports = {
  registrarUsuario,
  login,
};
