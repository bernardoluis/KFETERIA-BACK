// middlewares/autenticacion.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificaToken = (req, res, next) => {
  const token = req.header('Autorizacion');
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado, token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado; 
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = verificaToken;
