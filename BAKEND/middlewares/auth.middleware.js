const jwt = require("jsonwebtoken");

// Verifica que el request traiga un token JWT válido
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado",
      data: null,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = payload; // { id, rol }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
      data: null,
    });
  }
};

// Middleware factory: verificarRol("admin") o verificarRol("admin", "instructor")
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para realizar esta acción",
        data: null,
      });
    }
    next();
  };
};

module.exports = {
  verificarToken,
  verificarRol,
};
