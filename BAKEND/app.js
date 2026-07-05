require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const sequelize = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// ============================================
// MIDDLEWARES GLOBALES
// ============================================
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, process.env.UPLOAD_DIR || "uploads")));

// ============================================
// DOCUMENTACIÓN SWAGGER
// ============================================
const swaggerDocument = YAML.load(path.join(__dirname, "docs", "openapi.yaml"));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customSiteTitle: "SIRA API - Documentación" })
);

// ============================================
// RUTAS
// ============================================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/usuarios", require("./routes/usuario.routes"));
app.use("/api/documentos", require("./routes/documento.routes"));

// Ruta simple de verificación de vida del servidor
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "SIRA API funcionando correctamente" });
});

// ============================================
// MANEJO DE ERRORES (siempre al final)
// ============================================
app.use(errorHandler);

// ============================================
// INICIO DEL SERVIDOR
// ============================================
const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    // sync({ alter: true }) solo recomendado en desarrollo, no en producción
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });

    app.listen(PORT, () => {
      console.log(`Servidor SIRA corriendo en http://localhost:${PORT}`);
      console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error.message);
    process.exit(1);
  }
};

iniciarServidor();

module.exports = app;
