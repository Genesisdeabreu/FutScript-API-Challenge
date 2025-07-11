// Importamos supertest para hacer peticiones HTTP simuladas
const request = require('supertest');
// Importamos nuestra aplicación Express desde index.js
const app = require('../index');

// ID de un equipo existente para las pruebas.
// Asegúrate de que este ID exista en tu base de datos y tenga jugadores asociados
// para que el test pueda verificar que se devuelven datos.
const existingTeamId = 1; 
// ID de un equipo que sabemos que no tiene jugadores o no existe
const nonExistentTeamId = 9999; 

// Describe un grupo de tests para la ruta GET /equipos/:teamID/jugadores
describe('GET /equipos/:teamID/jugadores', () => {

  // Test 1: Obtener jugadores de un equipo existente con jugadores
  test('Debería retornar un array de jugadores y status 200 para un teamID válido con jugadores', async () => {
    // Realizamos una petición GET a la ruta /equipos/:teamID/jugadores
    const response = await request(app).get(`/equipos/${existingTeamId}/jugadores`);

    // Verificamos que el status de la respuesta sea 200 (OK)
    expect(response.statusCode).toBe(200);
    // Verificamos que el cuerpo de la respuesta sea un array
    expect(Array.isArray(response.body)).toBe(true);
    // Verificamos que el array no esté vacío (asumiendo que existingTeamId tiene jugadores)
    // Si tu base de datos está vacía para este equipo, este expect podría fallar.
    // Asegúrate de que el existingTeamId tenga jugadores para este test.
    expect(response.body.length).toBeGreaterThan(0); 
    // Opcional: Verificar la estructura de un jugador (ej. el primer elemento)
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('position'); // Asumiendo que la propiedad es 'position'
    }
  });

  // Test 2: Obtener jugadores de un equipo existente sin jugadores o ID no existente
  test('Debería retornar un array vacío y status 200 para un teamID sin jugadores o no existente', async () => {
    // Realizamos una petición GET a la ruta /equipos/:teamID/jugadores
    const response = await request(app).get(`/equipos/${nonExistentTeamId}/jugadores`);

    // Verificamos que el status de la respuesta sea 200 (OK)
    expect(response.statusCode).toBe(200);
    // Verificamos que el cuerpo de la respuesta sea un array
    expect(Array.isArray(response.body)).toBe(true);
    // Verificamos que el array esté vacío
    expect(response.body.length).toBe(0);
  });

  // Nota: No se requiere un test para error 500 aquí, ya que la ruta está diseñada
  // para devolver un array vacío si no hay jugadores o el equipo no existe,
  // y el controlador ya maneja errores internos con un try/catch.
});