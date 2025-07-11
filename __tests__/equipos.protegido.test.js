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

// Describe un grupo de tests para la ruta POST /equipos (protegida)
describe('POST /equipos (protegida)', () => {

  // Antes de que se ejecuten todos los tests de este grupo, obtenemos un token JWT
  beforeAll(async () => {
    // Hacemos una petición de login para obtener el token
    const response = await request(app)
      .post('/login')
      .send(adminCredentials);
    // Guardamos el token para usarlo en los tests protegidos
    authToken = response.body.token;
  });

  // Test 1: Agregar equipo con token válido
  test('Debería retornar un status 200 y mensaje de éxito al agregar equipo con token válido', async () => {
    // Definimos los datos del nuevo equipo
    const newTeam = {
      name: 'Equipo Test Protegido'
    };

    // Realizamos una petición POST a la ruta /equipos
    const response = await request(app)
      .post('/equipos')
      .set('Authorization', `Bearer ${authToken}`) // Enviamos el token en el header Authorization
      .send(newTeam); // Enviamos los datos del equipo en el cuerpo

    // Verificamos que el status de la respuesta sea 200 (OK)
    expect(response.statusCode).toBe(200);
    // Verificamos que el mensaje de éxito sea el esperado
    expect(response.body.message).toBe('Equipo agregado con éxito');
  });

  // Test 2: Intentar agregar equipo sin token
  test('Debería retornar un status 401 al intentar agregar equipo sin token', async () => {
    // Definimos los datos de un equipo (no se agregará)
    const newTeam = {
      name: 'Equipo Sin Token'
    };

    // Realizamos una petición POST a la ruta /equipos sin enviar el token
    const response = await request(app)
      .post('/equipos')
      .send(newTeam); // Enviamos los datos del equipo en el cuerpo

    // Verificamos que el status de la respuesta sea 401 (Unauthorized)
    expect(response.statusCode).toBe(401);
    // Verificamos que el mensaje de error sea el esperado
    expect(response.body.message).toBe('Token no proporcionado');
  });

  // Test 3: Intentar agregar equipo con token inválido
  test('Debería retornar un status 401 al intentar agregar equipo con token inválido', async () => {
    // Definimos los datos de un equipo (no se agregará)
    const newTeam = {
      name: 'Equipo Token Inválido'
    };
    // Token inválido (simplemente un string que no es un JWT válido)
    const invalidToken = 'este.es.un.token.invalido';

    // Realizamos una petición POST a la ruta /equipos con un token inválido
    const response = await request(app)
      .post('/equipos')
      .set('Authorization', `Bearer ${invalidToken}`) // Enviamos el token inválido
      .send(newTeam); // Enviamos los datos del equipo en el cuerpo

    // Verificamos que el status de la respuesta sea 401 (Unauthorized)
    expect(response.statusCode).toBe(401);
    // Verificamos que el mensaje de error sea el esperado
    expect(response.body.message).toBe('Token inválido o expirado');
  });
});