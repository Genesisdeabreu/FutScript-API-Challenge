// Importamos las funciones para interactuar con la base de datos
// Renombramos 'getPlayers' a 'getPlayersByTeam' y 'addPlayer' a 'addPlayerToTeam'
// para que los nombres en este controlador sean más descriptivos
const { getPlayers: getPlayersByTeam, addPlayer: addPlayerToTeam } = require('../db/consultas');

// ✅ Obtener jugadores de un equipo específico
const obtenerJugadores = async (req, res) => {
    const { teamID } = req.params;

    try {
        // Usamos la función renombrada para obtener los jugadores
        const jugadores = await getPlayersByTeam(teamID);
        // Si no hay jugadores, devolvemos un array vacío, no un error
        res.json(jugadores); // Devuelve los jugadores como un array
    } catch (error) {
        // Si ocurre un error en la base de datos, lo registramos y enviamos un error 500
        console.error("Error al obtener jugadores:", error.message);
        res.status(500).json({ message: "Error al obtener jugadores" });
    }
};

// ✅ Agregar jugador a un equipo específico (ruta protegida)
const registrarJugador = async (req, res) => {
    const { teamID } = req.params;
    const jugador = req.body;

    try {
        // Usamos la función renombrada para agregar el jugador
        // Pasamos un objeto con teamID y jugador para que coincida con la firma de addPlayer en consultas.js
        await addPlayerToTeam({ teamID, jugador });
        // Si todo sale bien, respondemos con un estado 201 (Created)
        res.status(201).json({ message: "Jugador agregado con éxito" });
    } catch (error) {
        // Si ocurre un error en la base de datos, lo registramos y enviamos un error 500
        console.error("Error al agregar jugador:", error.message);
        res.status(500).json({ message: "Error al agregar jugador" });
    }
};

// Exportamos las funciones para que puedan ser usadas en las rutas
module.exports = { obtenerJugadores, registrarJugador };