 //models/Producto.js
 const conexionPool = require('../config/conexion');

const Producto = {
  async existesku(sku) {
    const [rows] = await conexionPool.query('SELECT * FROM productos WHERE sku = ?', [sku]);
    return rows.length > 0; // Devuelve true si existe, false si no.
  },
  
  async crearProducto(producto) {
    const { nombre, sku, precio, peso, categoria, stock } = producto;
  
    // Verificar si la sku ya existe
    const existe = await this.existesku(sku);
    if (existe) {throw new Error('La sku del producto ya existe');
    }
    const [result] = await conexionPool.query('INSERT INTO productos (nombre, sku, precio, peso, categoria, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, sku, precio, peso, categoria, stock]
    );
    return result.insertId;
  },  

  async obtenerProductos() { const [rows] = await conexionPool.query('SELECT * FROM productos');
  return rows;
  },
  
  async actualizarProducto(id, datos) {
    const { nombre, sku, precio, peso, categoria, stock } = datos;
    await conexionPool.query('UPDATE productos SET nombre = ?, sku = ?, precio = ?, peso = ?, categoria = ?, stock = ? WHERE id = ?',
    [nombre, sku, precio, peso, categoria, stock, id]
    );
  },
  async actualizarProductoPorSKU(sku, datos) {
    const existe = await this.existesku(sku);
    if (!existe) {
      throw new Error('Producto no encontrado');
    }
  
    const { nombre, precio, peso, categoria, stock } = datos;
    await conexionPool.query(
      'UPDATE productos SET nombre = ?, precio = ?, peso = ?, categoria = ?, stock = ? WHERE sku = ?',
      [nombre, precio, peso, categoria, stock, sku]
    );
  },

  async eliminarProductoPorSKU(sku) {
    const existe = await this.existesku(sku);
    if (!existe) { throw new Error('Producto no encontrado');}
    await conexionPool.query('DELETE FROM productos WHERE sku = ?', [sku]);
  },

  async obtenerProductoPorId(id) { const [rows] = await conexionPool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0];
  }
};

module.exports = Producto;
