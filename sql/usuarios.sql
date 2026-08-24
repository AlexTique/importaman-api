-- sql/usuarios.sql
-- Este script crea la tabla "usuarios" DENTRO de la base de datos que ya
-- usa tu proyecto IMPORTAMAN ("importamanoficial"), la misma que usan
-- ImportamanApp e ImportamanWeb para la tabla "productos".
--
-- Como ya tienes la base de datos creada, solo necesitas ejecutar esto
-- (por ejemplo, desde MySQL Workbench, phpMyAdmin o la terminal de MySQL).

USE importamanoficial;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
    nombres         VARCHAR(100)  NOT NULL,
    apellidos       VARCHAR(100)  NOT NULL,
    correo          VARCHAR(150)  NOT NULL UNIQUE,   -- UNIQUE evita correos duplicados
    clave           VARCHAR(255)  NOT NULL,          -- aqui se guarda el hash, nunca la clave real
    fecha_registro  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
