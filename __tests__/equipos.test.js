// Importamos supertest para hacer peticiones HTTP simuladas a nuestra aplicación
const request = require('supertest');
// Importamos nuestra aplicación Express desde index.js
const app = require('../index');

// Describe un grupo de tests para la ruta /equipos
describe('GET /equipos', () => {
  // Test para verificar que la ruta GET /equipos devuelve un array y un status 200
  test('Debería retornar un array y un status 200', async () => {
    // Realizamos una petición GET a la ruta /equipos
    const response = await request(app).get('/equipos');

    // Verificamos que el status de la respuesta sea 200
    expect(response.statusCode).toBe(200);
    // Verificamos que el cuerpo de la respuesta sea un array
    expect(Array.isArray(response.body)).toBe(true);
  });
});