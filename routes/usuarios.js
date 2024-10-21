// routes/usuarios.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('contraseña123', salt);

console.log(hash);
const usuarios = [
  { id: 1, nombre_usuario: 'admin', contrasena: '$2a$10$PzniD1ccRuAZ0sRDd8kyguC/31EIKRqfRiHFciKO/lQhJoMXVEAMO'}// contraseña123
];

router.post('/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  const usuario = usuarios.find(u => u.nombre_usuario === nombre_usuario);

  if (!usuario) {
    return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
  }

  const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!contrasenaValida) {
    return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
  }

  // token JWT
  const token = jwt.sign(
    { id: usuario.id, nombre_usuario: usuario.nombre_usuario },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token });
});

module.exports = router;
