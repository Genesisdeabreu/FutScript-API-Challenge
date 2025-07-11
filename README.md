# ⚽ FutScript - API REST de Gestión de Equipos y Jugadores

Aplicación **backend con Node.js y Express** conectada a una base de datos PostgreSQL, diseñada para la **gestión de equipos y jugadores de fútbol**, con autenticación de administrador mediante **tokens JWT**.

Este proyecto fue desarrollado como parte del desafío de Desafío Latam, enfocado en la creación de una API REST para un sistema de administración de escuelas de fútbol.

---

## 🛠️ Tecnologías usadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-black?style=for-the-badge)
![PostgreSQL](https://img.shields.io="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white")
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![pg](https://img.shields.io/badge/pg-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-0D1117?style=for-the-badge&logo=mocha&logoColor=white)

---

## 🚀 ¿Cómo usarlo?

### ▶️ Clonar y ejecutar el proyecto

```bash
git clone https://github.com/tu-usuario/futscript-backend.git
cd futscript-backend
npm install
node index.js
```

---

## 📁 Estructura del proyecto

- **index.js**: Servidor principal de Express y configuración de rutas.
- **db/consultas.js**: Funciones para interactuar con la base de datos PostgreSQL.
- **middlewares/authMiddleware.js**: Middleware para la verificación de tokens JWT.
- **controllers/auth.js**: Lógica para el login del administrador.
- **controllers/equipos.js**: Lógica para obtener y agregar equipos.
- **controllers/jugadores.js**: Lógica para obtener y registrar jugadores.
- **utils.js**: Archivo de utilidades (ej. secretKey para JWT).
- **__tests__/**: Carpeta que contiene todos los tests unitarios y de integración con Jest y Supertest.
- **.gitignore**: Archivo para ignorar directorios y archivos no deseados (ej. node_modules).


---

## 🧪 Base de datos - Script SQL para crear la base de datos y tablas:

Ejecuta este script en tu cliente de PostgreSQL (ej. pgAdmin, DBeaver, o psql):

```sql
-- Elimina la base de datos si ya existe (¡CUIDADO: esto borrará todos los datos!)
DROP DATABASE IF EXISTS futscript;

-- Crea la base de datos
CREATE DATABASE futscript;

-- Conéctate a la nueva base de datos (solo si usas psql, en clientes gráficos, conéctate manualmente)
\c futscript;

-- Crea la tabla 'equipos'
CREATE TABLE equipos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

-- Crea la tabla 'posiciones'
CREATE TABLE posiciones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

-- Crea la tabla 'jugadores'
CREATE TABLE jugadores (
    id SERIAL PRIMARY KEY,
    id_equipo INT REFERENCES equipos(id),
    name VARCHAR(250),
    position INT REFERENCES posiciones(id)
);

-- Inserta las posiciones predefinidas
INSERT INTO posiciones (name) VALUES
('delantero'),
('centrocampista'),
('defensa'),
('portero');

-- Inserta datos de ejemplo (opcional, para pruebas)
INSERT INTO equipos (name) VALUES ('Real Madrid');
INSERT INTO equipos (name) VALUES ('Barcelona');

-- Después de insertar equipos, verifica sus IDs (ej. SELECT * FROM equipos;)
-- Y luego inserta jugadores usando los IDs de equipo y posición
INSERT INTO jugadores (id_equipo, name, position) VALUES (1, 'Karim Benzema', 1); -- Asumiendo ID 1 para Real Madrid y 1 para delantero
INSERT INTO jugadores (id_equipo, name, position) VALUES (1, 'Luka Modrić', 2);    -- Asumiendo ID 1 para Real Madrid y 2 para centrocampista
INSERT INTO jugadores (id_equipo, name, position) VALUES (2, 'Robert Lewandowski', 1); -- Asumiendo ID 2 para Barcelona y 1 para delantero
```

---


## 🧪 Tests Unitarios y de Integración

El proyecto incluye tests automatizados utilizando Jest y Supertest para asegurar el correcto funcionamiento de las rutas y la lógica de negocio.
Para ejecutar los tests:

```bash
npm test
```

---

## ✅ Requerimientos cumplidos del desafío

1. Utilizar JWT para la autorización de usuarios ✅
- Implementación de POST /login para generar tokens.
- Middleware verificarToken para proteger rutas.
2. Utilizar el paquete pg para la comunicación y gestión de una base de datos en una aplicación Node.js ✅
- Conexión a PostgreSQL y uso de pg-pool.
3. Realizar consultas SQL para la obtención e inserción de datos desde Node ✅
- Funciones en db/consultas.js para SELECT e INSERT.
4. Utilizar correctamente los códigos de estado HTTP en las situaciones según correspondan ✅
- Respuestas con 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized.
5. Realizar tests unitarios usando el paquete supertest ✅
- Suite completa de tests para todas las rutas y escenarios.

---

### 👩‍💻 Autor
**Génesis de Abreu**  
*Desarrolladora Frontend Junior* 💻🎨✨  
[GitHub](https://github.com/Genesisdeabreu)

¡Gracias por visitar este repositorio! ⭐