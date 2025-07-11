// Importamos supertest para hacer peticiones HTTP simuladas
    const request = require('supertest');
    // Importamos nuestra aplicación Express desde index.js
    const app = require('../index');

    // Describe un grupo de tests para la ruta /login
    describe('POST /login', () => {

      // Test 1: Credenciales correctas
      test('Debería retornar un objeto con un token y un status 200 al enviar credenciales correctas', async () => {
        // Definimos las credenciales correctas del administrador
        const adminCredentials = {
          username: 'admin',
          password: '1234'
        };

        // Realizamos una petición POST a la ruta /login con las credenciales
        const response = await request(app)
          .post('/login')
          .send(adminCredentials); // Enviamos las credenciales en el cuerpo de la petición

        // Verificamos que el status de la respuesta sea 200 (OK)
        expect(response.statusCode).toBe(200);
        // Verificamos que el cuerpo de la respuesta sea un objeto
        expect(typeof response.body).toBe('object');
        // Verificamos que el objeto contenga una propiedad 'token'
        expect(response.body).toHaveProperty('token');
        // Verificamos que el valor de 'token' no sea nulo o vacío
        expect(response.body.token).toBeTruthy();
      });

      // Test 2: Credenciales incorrectas
      test('Debería retornar un status 400 al enviar credenciales incorrectas', async () => {
        // Definimos credenciales incorrectas
        const invalidCredentials = {
          username: 'admin',
          password: 'wrongpassword' // Contraseña incorrecta
        };

        // Realizamos una petición POST a la ruta /login con las credenciales incorrectas
        const response = await request(app)
          .post('/login')
          .send(invalidCredentials); // Enviamos las credenciales en el cuerpo de la petición

        // Verificamos que el status de la respuesta sea 400 (Bad Request)
        expect(response.statusCode).toBe(400);
        // Verificamos que el cuerpo de la respuesta contenga el mensaje de error esperado
        expect(response.body.message).toBe('Credenciales inválidas');
      });
    });
    