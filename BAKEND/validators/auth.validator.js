const { body, validationResult } = require("express-validator");

const validarLogin = [
  body("correo").trim().isEmail().withMessage("Correo inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

const validarRegistro = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("correo").trim().isEmail().withMessage("Correo inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("rol")
    .isIn(["aprendiz", "instructor", "admin"])
    .withMessage("Rol inválido"),
];

const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Campos incompletos o inválidos",
      errores: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg })),
    });
  }
  next();
};

module.exports = {
  validarLogin,
  validarRegistro,
  manejarErroresValidacion,
};
