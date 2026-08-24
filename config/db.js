// config/db.js
// Este archivo crea un "pool" de conexiones a MySQL. Un pool es un grupo de
// conexiones reutilizables: en vez de abrir y cerrar una conexion nueva por
// cada peticion (lento), Node.js toma una conexion prestada del pool, la usa
// y la devuelve. Es la forma recomendada de trabajar con MySQL en Node.js.

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // maximo de conexiones simultaneas en el pool
});

// Funcion para verificar que la conexion funciona al iniciar el servidor
const verificarConexion = async () => {
  try {
    const conexion = await pool.getConnection();
    console.log('Conexion a MySQL (importamanoficial) establecida correctamente.');
    conexion.release(); // se devuelve la conexion al pool
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, verificarConexion };
