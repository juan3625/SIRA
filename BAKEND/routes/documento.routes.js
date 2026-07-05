const express = require("express");
const router = express.Router();

const documentoController = require("../controllers/documento.controller");
const {
  validarCrearDocumento,
  manejarErroresValidacion,
} = require("../validators/documento.validator");
const { verificarToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// POST /api/documentos - requiere autenticación y sube un archivo (multipart/form-data)
router.post(
  "/",
  verificarToken,
  upload.single("archivo"),
  validarCrearDocumento,
  manejarErroresValidacion,
  documentoController.crearDocumento
);

// GET /api/documentos - público
router.get("/", documentoController.listar);

// GET /api/documentos/:id - público
router.get("/:id", documentoController.obtenerPorId);

// PUT /api/documentos/:id - requiere autenticación
router.put("/:id", verificarToken, documentoController.actualizar);

// DELETE /api/documentos/:id - requiere autenticación (dueño o admin, validado en el servicio)
router.delete("/:id", verificarToken, documentoController.eliminar);

module.exports = router;
