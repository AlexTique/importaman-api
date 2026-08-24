// controllers/authController.js
// Logica de negocio: que pasa cuando alguien intenta registrarse o iniciar sesion.
// Usa los mismos nombres de campo que ya tiene tu formulario en React
// (Login.jsx y Registro.jsx): correo, clave, nombres, apellidos.

const bcrypt = require('bcryptjs');
const { buscarPorCorreo, crearUsuario } = require('../models/usuarioModel');

// -----------------------------------------------------------------
// REGISTRO DE USUARIO
// POST /api/auth/registro
// Body esperado: { nombres, apellidos, correo, clave }
// (coincide exactamente con el formulario de Registro.jsx)
// -----------------------------------------------------------------
const registrar = async (req, res) => {
  try {
    const { nombres, apellidos, correo, clave } = req.body;

    // Validacion basica: todos los campos son obligatorios
    if (!nombres || !apellidos || !correo || !clave) {
      return res.status(400).json({
        mensaje: 'Error en la autenticacion: todos los campos son obligatorios',
      });
    }

    // Misma regla que ya validas en el frontend (Registro.jsx): minimo 8 caracteres
    if (clave.length < 8) {
      return res.status(400).json({
        mensaje: 'Error en la autenticacion: la contrasena debe tener minimo 8 caracteres',
      });
    }

    // Verificamos que el correo no este ya registrado
    const usuarioExistente = await buscarPorCorreo(correo);
    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: 'Error en la autenticacion: el correo ya esta registrado',
      });
    }

    // Encriptamos la clave antes de guardarla (nunca en texto plano)
    const salt = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(clave, salt);

    // Insertamos el usuario en la tabla "usuarios" de importamanoficial
    await crearUsuario({ nombres, apellidos, correo, claveEncriptada });

    return res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: { nombres, apellidos, correo },
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error en la autenticacion: ocurrio un problema en el servidor',
      error: error.message,
    });
  }
};

// -----------------------------------------------------------------
// INICIO DE SESION
// POST /api/auth/login
// Body esperado: { correo, clave }
// (coincide exactamente con el formulario de Login.jsx)
// -----------------------------------------------------------------
const login = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    if (!correo || !clave) {
      return res.status(400).json({
        mensaje: 'Error en la autenticacion: correo y contrasena son obligatorios',
      });
    }

    // Buscamos el usuario por correo
    const usuario = await buscarPorCorreo(correo);

    // Mensaje generico si no existe (por seguridad, no decimos "correo no existe")
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Error en la autenticacion' });
    }

    // Comparamos la clave recibida con el hash guardado en la base de datos
    const claveValida = await bcrypt.compare(clave, usuario.clave);
    if (!claveValida) {
      return res.status(401).json({ mensaje: 'Error en la autenticacion' });
    }

    // Autenticacion satisfactoria
    return res.status(200).json({
      mensaje: 'Autenticacion satisfactoria',
      usuario: {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error en la autenticacion: ocurrio un problema en el servidor',
      error: error.message,
    });
  }
};

module.exports = { registrar, login };
