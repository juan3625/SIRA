/**
 * Middleware centralizado de errores.
 * Se coloca al FINAL de todas las rutas en tu app.js / server.js:
 *   app.use(errorHandler);
 */
const errorHandler = (error, req, res, next) => {
  // Log interno detallado (no se expone al cliente)
  console.error("Error capturado:", error);

  const statusCode = error.statusCode || 500;
  const message =
    statusCode === 500
      ? "Error interno del servidor"
      : error.message || "Ocurrió un error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
