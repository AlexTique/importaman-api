# API de Registro e Inicio de Sesion - IMPORTAMAN

Evidencia GA7-220501096-AA5-EV01. Diseño y desarrollo de servicios web - caso.

## Descripcion
API REST construida con **Node.js + Express + MySQL** para el registro e
inicio de sesion de usuarios de **IMPORTAMAN**. Reutiliza la misma base de
datos MySQL (`importamanoficial`) que ya usan `ImportamanApp` (escritorio,
Java) e `ImportamanWeb` (Servlets/JSP), agregando la tabla `usuarios`.

Los nombres de los campos (`correo`, `clave`, `nombres`, `apellidos`)
coinciden exactamente con los formularios ya construidos en el frontend
React (`ALEX_TIQUE_AA4_EV03`, componentes `Login.jsx` y `Registro.jsx`),
para que esta API pueda conectarse directamente sin necesidad de
transformar datos.

La contrasena se guarda siempre encriptada (bcryptjs), nunca en texto plano.

## Estructura del proyecto
```
ALEX_TIQUE_AA5_EV01/
├── config/db.js                 # Pool de conexion a MySQL
├── models/usuarioModel.js       # Consultas SQL (equivalente a un DAO)
├── controllers/authController.js # Logica de registro y login
├── routes/authRoutes.js         # Definicion de rutas
├── sql/usuarios.sql             # Script para crear la tabla usuarios
├── server.js                    # Punto de entrada
├── .env.example
└── package.json
```

## Instalacion y ejecucion

1. Instalar dependencias:
   ```
   npm install
   ```

2. Crear la tabla `usuarios` en tu base de datos MySQL ejecutando el script
   `sql/usuarios.sql` (una sola vez). Puedes hacerlo desde MySQL Workbench,
   phpMyAdmin, o la terminal:
   ```
   mysql -u root -p importamanoficial < sql/usuarios.sql
   ```

3. Crear el archivo de variables de entorno:
   ```
   cp .env.example .env
   ```
   Y ajustar `DB_USER`, `DB_PASSWORD`, etc. con tus datos reales de MySQL
   (los mismos que usa `ConexionDB.java` en tu proyecto de escritorio).

4. Ejecutar en modo desarrollo:
   ```
   npm run dev
   ```
   Deberia aparecer:
   ```
   Conexion a MySQL (importamanoficial) establecida correctamente.
   Servidor corriendo en http://localhost:3000
   ```

## Pruebas con Postman

### 1. Registrar usuario
- `POST http://localhost:3000/api/auth/registro`
- Body (raw, JSON):
  ```json
  {
    "nombres": "Alex",
    "apellidos": "Tique",
    "correo": "alex@correo.com",
    "clave": "clave1234"
  }
  ```
- Respuesta esperada (201): `{ "mensaje": "Usuario registrado exitosamente", ... }`

### 2. Iniciar sesion (correctas)
- `POST http://localhost:3000/api/auth/login`
- Body:
  ```json
  { "correo": "alex@correo.com", "clave": "clave1234" }
  ```
- Respuesta esperada (200): `{ "mensaje": "Autenticacion satisfactoria", ... }`

### 3. Iniciar sesion (incorrectas)
- Mismo endpoint, con clave o correo equivocados.
- Respuesta esperada (401): `{ "mensaje": "Error en la autenticacion" }`

## Conexion con el frontend React
Esta API fue conectada al proyecto `ALEX_TIQUE_AA4_EV03` (React), en los
componentes `Login.jsx` y `Registro.jsx`, reemplazando la simulacion con
`localStorage` por peticiones reales con `fetch` a esta API. Para que
funcione en conjunto:
1. Levantar esta API (`npm run dev`, puerto 3000).
2. Levantar el proyecto React (`npm run dev`, puerto 5173, con Vite).
3. Registrarse/iniciar sesion desde la interfaz de React; los datos
   quedaran guardados en la tabla `usuarios` de MySQL.

## Control de versiones (Git)
```
git init
git add .
git commit -m "Version inicial: API de registro e inicio de sesion con MySQL para IMPORTAMAN"
git remote add origin <URL-del-repositorio>
git branch -M main
git push -u origin main
```
