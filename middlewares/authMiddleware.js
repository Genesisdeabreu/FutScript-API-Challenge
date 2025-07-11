// Importamos el paquete jsonwebtoken para verificar el token
const jwt = require("jsonwebtoken");

// Importamos la clave secreta desde utils.js para validar la firma del token
const { secretKey } = require("../utils");

// Middleware que protege rutas verificando el token JWT enviado en los headers
const verificarToken = (req, res, next) => {
  // Obtenemos el header de autorización. Debería venir como: "Bearer <token>"
  const authHeader = req.headers.authorization;

  // Si no viene el header Authorization, respondemos con error 401
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  // Extraemos el token del string "Bearer <token>"
  // Usamos split para separar y quedarnos con la segunda parte
  const token = authHeader.split(" ")[1];

  try {
    // Verificamos si el token es válido usando la secretKey
    // Si es válido, devuelve el contenido del token (el payload)
    const decoded = jwt.verify(token, secretKey);

    // Guardamos el contenido del token en req.user por si lo necesitamos más adelante
    req.user = decoded;

    // Llamamos a next() para permitir que la petición continúe su curso
    next();
  } catch (error) {
    // Si el token es inválido o está expirado, respondemos con error 401
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Exportamos el middleware para usarlo en las rutas que queramos proteger
module.exports = { verificarToken };
