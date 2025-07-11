const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils");

const admin = {
  username: "admin",
  password: "1234"
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ role: "admin" }, secretKey, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }

  res.status(400).json({ message: "Credenciales inválidas" });
};

module.exports = { login };
