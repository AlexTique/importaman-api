// server.js
// Punto de entrada: configura Express, conecta MySQL y levanta el servidor.

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { verificarConexion } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Verifica que la conexion a MySQL funcione antes de aceptar peticiones
verificarConexion();

const app = express();

// Permite peticiones desde el React (Vite corre en otro puerto/origen)
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

// Permite que Express entienda peticiones con body en formato JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Registro e Inicio de Sesion de IMPORTAMAN funcionando correctamente.');
});

// Rutas de autenticacion: /api/auth/registro y /api/auth/login
app.use('/api/auth', authRoutes);

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
