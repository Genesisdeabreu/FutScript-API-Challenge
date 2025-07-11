// ==========================
//  IMPORTACIÓN DE PAQUETES
// ==========================

// Importamos Express para crear el servidor
const express = require("express");

// Importamos Cors para permitir peticiones desde distintos orígenes (por ejemplo, desde el frontend)
const cors = require("cors");

// Creamos la instancia de la app
const app = express();

// ==========================
//  MIDDLEWARES GLOBALES
// ==========================

// Permite que la API pueda ser consumida desde otro origen (dominio diferente)
app.use(cors());

// Permite que el servidor pueda leer datos en formato JSON desde el body de las peticiones
app.use(express.json());

// ==========================
//  IMPORTACIÓN DE CONTROLADORES
// ==========================

// Importamos la función que maneja el login de administrador
const { login } = require("./controllers/auth");

// Importamos funciones para manejar equipos
const { obtenerEquipos, agregarEquipo } = require("./controllers/equipos");

// Importamos funciones para manejar jugadores
const { obtenerJugadores, registrarJugador } = require("./controllers/jugadores");

// ==========================
//  MIDDLEWARE DE AUTORIZACIÓN
// ==========================

// Importamos el middleware que valida el token JWT en rutas protegidas
const { verificarToken } = require("./middlewares/authMiddleware");

// ==========================
//           RUTAS
// ==========================

// Ruta pública para login del administrador. Devuelve un token si las credenciales son válidas.
app.post("/login", login);

// Rutas para EQUIPOS
app.get("/equipos", obtenerEquipos);             // Ruta pública: lista todos los equipos
app.post("/equipos", verificarToken, agregarEquipo); // Ruta protegida: requiere token para crear equipo

// Rutas para JUGADORES
app.get("/equipos/:teamID/jugadores", obtenerJugadores);     // Ruta pública: lista jugadores de un equipo específico
app.post("/equipos/:teamID/jugadores", verificarToken, registrarJugador); // Ruta protegida: requiere token para registrar jugador

// ===========================================
//   INICIAR EL SERVIDOR Y EXPORTAR LA APP
// ===========================================

// Esta condición asegura que el servidor solo se inicie cuando 'index.js'
// es ejecutado directamente (ej. 'node index.js'),
// y no cuando es importado por un archivo de test (ej. 'require('./index.js')').
if (require.main === module) {
  app.listen(3000, () => {
    console.log("SERVER ON 🚀 en http://localhost:3000");
  });
}

// Exportamos la instancia de la aplicación Express.
// Esto es crucial para que 'supertest' pueda importar y probar tu API
// sin necesidad de que el servidor esté escuchando en un puerto real.
module.exports = app;
