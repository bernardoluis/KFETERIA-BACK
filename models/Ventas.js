// models/Ventas.js
const conexionPool = require('../config/conexion');

const Venta = {
  async registrarVenta(venta) {
    const { sku, cantidad } = venta;

    // Verificar si el producto existe y obtener el producto_id
    const [producto] = await conexionPool.query('SELECT id, stock FROM productos WHERE sku = ?', [sku]);
    if (producto.length === 0) {
      throw new Error('Producto no encontrado');
    }

    // Desestructurar el ID y el stock del producto
    const { id: producto_id, stock } = producto[0];

    // Asegurarse de que hay suficiente stock
    if (stock < cantidad) {
      throw new Error('Stock insuficiente');
    }

    // Actualizar el stock del producto
    await conexionPool.query('UPDATE productos SET stock = stock - ? WHERE sku = ?', [cantidad, sku]);

    // Registrar la venta
    const [result] = await conexionPool.query('INSERT INTO ventas (producto_id, cantidad) VALUES (?, ?)', [producto_id, cantidad]);
    return result.insertId;
  },

  async obtenerVentas() {
    const [rows] = await conexionPool.query('SELECT * FROM ventas');
    return rows;
  }
};

module.exports = Venta;
