const { body, validationResult } = require("express-validator");

// Reglas de validación para la creación de un documento
const validarCrearDocumento = [
  body("titulo")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres"),

  body("descripcion")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("La descripción no puede superar los 2000 caracteres"),
  // Nota: usuarioId ya NO se valida aquí porque se obtiene del token JWT
  // (req.usuario.id) en el controlador, no del body — es más seguro así,
  // evita que alguien intente crear documentos a nombre de otro usuario.
];

// Middleware que revisa si hubo errores de validación y corta el flujo si los hay
const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Campos incompletos o inválidos",
      errores: errores.array().map((e) => ({
        campo: e.path,
        mensaje: e.msg,
      })),
    });
  }
  next();
};

module.exports = {
  validarCrearDocumento,
  manejarErroresValidacion,
};
