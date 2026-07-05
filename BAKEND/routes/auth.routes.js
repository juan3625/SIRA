const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const {
  validarLogin,
  validarRegistro,
  manejarErroresValidacion,
} = require("../validators/auth.validator");

// POST /api/auth/login
router.post("/login", validarLogin, manejarErroresValidacion, authController.login);

// POST /api/auth/register
router.post("/register", validarRegistro, manejarErroresValidacion, authController.register);

module.exports = router;
