// routes/ventas.js
const express = require('express');
const Venta = require('../models/Ventas');
const verificaToken = require('../middleware/autenticar');
const router = express.Router();

// Registrar una venta
router.post('/', verificaToken, async (req, res) => {
  const venta = req.body;

  try {
    const ventaId = await Venta.registrarVenta(venta);
    res.status(201).json({ mensaje: 'Venta registrada', venta_id: ventaId });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.get('/', verificaToken, async (req, res) => {
  try {
    const ventas = await Venta.obtenerVentas();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las ventas' });
  }
});

module.exports = router;
