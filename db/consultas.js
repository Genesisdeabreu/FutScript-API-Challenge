const { Pool } = require('pg');

// 📌 Configuración de la conexión a PostgreSQL
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234', // Asegúrate de que esta sea tu contraseña real de PostgreSQL
    database: 'futscript', // Asegúrate de que esta sea el nombre de tu base de datos
    allowExitOnIdle: true
});


// ==========================
//   CONSULTAS A LA BD
// ==========================

// ✅ Obtiene todos los equipos, incluyendo su ID
const getTeams = async () => {
    const query = "SELECT id, name FROM equipos ORDER BY id";
    const { rows } = await pool.query(query);
    return rows;
};


// ✅ Obtener todos los jugadores de un equipo usando INNER JOIN
const getPlayers = async (teamID) => {
    const query = `
        SELECT jugadores.name, jugadores.position -- ¡CORREGIDO: 'posicion' a 'position'!
        FROM jugadores
        INNER JOIN equipos ON jugadores.id_equipo = equipos.id -- ¡CORREGIDO: 'equipo_id' a 'id_equipo'!
        WHERE equipos.id = $1
    `;
    const values = [teamID];
    const { rows } = await pool.query(query, values);
    return rows;
};

// ✅ Agregar un nuevo equipo
const addTeam = async (equipo) => {
    const query = "INSERT INTO equipos (name) VALUES ($1)";
    const values = [equipo.name];
    await pool.query(query, values);
};

// ✅ Agregar un jugador a un equipo
const addPlayer = async ({ jugador, teamID }) => {
    // Asegúrate de que los nombres de las columnas coincidan con tu tabla 'jugadores'
    // Son 'name', 'position', 'id_equipo'
    const query = "INSERT INTO jugadores (name, position, id_equipo) VALUES ($1, $2, $3)"; // ¡CORREGIDO 'posicion' a 'position' y 'equipo_id' a 'id_equipo'!
    const values = [jugador.name, jugador.posicion, teamID]; // Ten en cuenta que `jugador.posicion` aquí sí se mantiene, pero se mapea a `position` en la BD.
    await pool.query(query, values);
};

// Exportamos todas las funciones para que puedan usarse en los controladores
module.exports = { getTeams, addTeam, getPlayers, addPlayer };