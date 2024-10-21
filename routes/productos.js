// routes/productos.js
const express = require('express');
const Producto = require('../models/Producto');
const verificaToken = require('../middleware/autenticar'); 
const router = express.Router();

// Lista de productos 
router.get('/', verificaToken, async (req, res) => {
    try {
      const productos = await Producto.obtenerProductos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  });

// Crear producto 
router.post('/', verificaToken, async (req, res) => {
    try {
      const nuevoProducto = req.body;
      const id = await Producto.crearProducto(nuevoProducto);
      res.status(201).json({ id });
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  });

 //actualizar
router.put('/:sku', verificaToken, async (req, res) => {
    const { sku } = req.params;
    const datos = req.body;
  
    try {
      await Producto.actualizarProductoPorSKU(sku, datos);
      res.status(200).json({ mensaje: 'Producto actualizado con éxito' });
    } catch (error) {
      if (error.message === 'Producto no encontrado') {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
  });
  


// Eliminar producto
router.delete('/:sku', verificaToken, async (req, res) => {
    const { sku } = req.params;
    try {
      await Producto.eliminarProductoPorSKU(sku);
      res.status(200).json({ mensaje: 'Producto eliminado!' });
    } catch (error) {
      if (error.message === 'Producto no encontrado') {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.status(500).json({ mensaje: 'Error eliminando el producto' });
    }
  });
  
  
  
module.exports = router;
