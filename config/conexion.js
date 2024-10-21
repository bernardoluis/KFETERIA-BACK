//config/conexion.js
const mysql = require('mysql2/promise');
require('dotenv').config();

//pool de conexiones MySQL
const conexionPool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = conexionPool;

