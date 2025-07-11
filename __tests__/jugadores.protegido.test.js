// Importamos supertest para hacer peticiones HTTP simuladas
const request = require('supertest');
// Importamos nuestra aplicación Express desde index.js
const app = require('../index');

// Definimos las credenciales de administrador para obtener el token
const adminCredentials = {
  username: 'admin',
  password: '1234'
};

// Variable para almacenar el token JWT que obtendremos antes de los tests
let authToken = '';
// ID de un equipo existente para las pruebas (asume que el Equipo A tiene ID 1)
// Asegúrate de que este ID exista en tu base de datos antes de ejecutar los tests
const existingTeamId = 1; 

// Describe un grupo de tests para la ruta POST /equipos/:teamID/jugadores (protegida)
describe('POST /equipos/:teamID/jugadores (protegida)', () => {

  // Antes de que se ejecuten todos los tests de este grupo, obtenemos un token JWT
  beforeAll(async () => {
    // Hacemos una petición de login para obtener el token
    const response = await request(app)
      .post('/login')
      .send(adminCredentials);
    // Guardamos el token para usarlo en los tests protegidos
    authToken = response.body.token;
  });

  // Test 1: Agregar jugador con token válido
  test('Debería retornar un status 201 y mensaje de éxito al agregar jugador con token válido', async () => {
    // Definimos los datos del nuevo jugador
    const newPlayer = {
      name: 'Jugador Test Protegido',
      posicion: 1 // ID de la posición, ej. 1 para 'delantero'
    };

    // Realizamos una petición POST a la ruta /equipos/:teamID/jugadores
    const response = await request(app)
      .post(`/equipos/${existingTeamId}/jugadores`) // Usamos el ID del equipo existente
      .set('Authorization', `Bearer ${authToken}`) // Enviamos el token en el header Authorization
      .send(newPlayer); // Enviamos los datos del jugador en el cuerpo

    // Verificamos que el status de la respuesta sea 201 (Created)
    expect(response.statusCode).toBe(201);
    // Verificamos que el mensaje de éxito sea el esperado
    expect(response.body.message).toBe('Jugador agregado con éxito');
  });

  // Test 2: Intentar agregar jugador sin token
  test('Debería retornar un status 401 al intentar agregar jugador sin token', async () => {
    // Definimos los datos de un jugador (no se agregará)
    const newPlayer = {
      name: 'Jugador Sin Token',
      posicion: 2 // ID de la posición
    };

    // Realizamos una petición POST a la ruta /equipos/:teamID/jugadores sin enviar el token
    const response = await request(app)
      .post(`/equipos/${existingTeamId}/jugadores`) // Usamos el ID del equipo existente
      .send(newPlayer); // Enviamos los datos del jugador en el cuerpo

    // Verificamos que el status de la respuesta sea 401 (Unauthorized)
    expect(response.statusCode).toBe(401);
    // Verificamos que el mensaje de error sea el esperado
    expect(response.body.message).toBe('Token no proporcionado');
  });

  // Test 3: Intentar agregar jugador con token inválido
  test('Debería retornar un status 401 al intentar agregar jugador con token inválido', async () => {
    // Definimos los datos de un jugador (no se agregará)
    const newPlayer = {
      name: 'Jugador Token Inválido',
      posicion: 3 // ID de la posición
    };
    // Token inválido
    const invalidToken = 'este.es.un.token.invalido.para.jugador';

    // Realizamos una petición POST a la ruta /equipos/:teamID/jugadores con un token inválido
    const response = await request(app)
      .post(`/equipos/${existingTeamId}/jugadores`) // Usamos el ID del equipo existente
      .set('Authorization', `Bearer ${invalidToken}`) // Enviamos el token inválido
      .send(newPlayer); // Enviamos los datos del jugador en el cuerpo

    // Verificamos que el status de la respuesta sea 401 (Unauthorized)
    expect(response.statusCode).toBe(401);
    // Verificamos que el mensaje de error sea el esperado
    expect(response.body.message).toBe('Token inválido o expirado');
  });
});
