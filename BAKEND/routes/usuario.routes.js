const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

// GET /api/usuarios - requiere estar autenticado y ser admin
router.get("/", verificarToken, verificarRol("admin"), usuarioController.listar);

// GET /api/usuarios/:id - requiere estar autenticado
router.get("/:id", verificarToken, usuarioController.obtenerPorId);

// PUT /api/usuarios/:id - requiere estar autenticado
router.put("/:id", verificarToken, usuarioController.actualizar);

// DELETE /api/usuarios/:id - requiere ser admin
router.delete("/:id", verificarToken, verificarRol("admin"), usuarioController.eliminar);

module.exports = router;
