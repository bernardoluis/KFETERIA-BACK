// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors
const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const ventasRouter = require('./routes/ventas');

const app = express();

app.use(cors({ 
  origin: 'http://localhost:4000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ventas', ventasRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
