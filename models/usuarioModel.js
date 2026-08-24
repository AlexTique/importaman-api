// models/usuarioModel.js
// Aqui viven UNICAMENTE las consultas SQL relacionadas con la tabla "usuarios".
// Es el mismo patron que ya usas en Java con ProductoDAO.java: separar el
// acceso a datos (SQL) de la logica de negocio (controller).

const { pool } = require('../config/db');

// Busca un usuario por su correo. Devuelve undefined si no existe.
const buscarPorCorreo = async (correo) => {
  const [filas] = await pool.query(
    'SELECT * FROM usuarios WHERE correo = ?',
    [correo]
  );
  return filas[0]; // el primer resultado, o undefined si no hay ninguno
};

// Inserta un nuevo usuario. Recibe la clave YA encriptada (nunca en texto plano).
const crearUsuario = async ({ nombres, apellidos, correo, claveEncriptada }) => {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nombres, apellidos, correo, clave) VALUES (?, ?, ?, ?)',
    [nombres, apellidos, correo, claveEncriptada]
  );
  return resultado.insertId; // el id_usuario generado automaticamente
};

module.exports = { buscarPorCorreo, crearUsuario };
