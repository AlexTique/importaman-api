// routes/authRoutes.js
// Conecta las URLs de la API con las funciones del controlador.

const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');

// POST http://localhost:3000/api/auth/registro
router.post('/registro', registrar);

// POST http://localhost:3000/api/auth/login
router.post('/login', login);

module.exports = router;
