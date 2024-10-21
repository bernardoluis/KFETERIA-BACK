
#Cafetería Konecta - Backend
Este es el backend de la aplicación Cafetería Konecta, desarrollada en Node.js 

#Requisitos
Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:
Node.js (v14 o superior)
mysql

#instalar dependencias
npm install

#correr proyecto:
node app.js

#Crear un nuevo producto: (post)
localhost:3000/productos
{
  "nombre": "Café",
  "sku": "CAF123",
  "precio": 5000,
  "peso": 200,
  "categoria": "Bebida",
  "stock": 50
}

#editar productos (put)
localhost:3000/productos/CAF123

#Realizar una venta
localhost:3000/ventas
{
  "sku": "60f7a7a4d3e1e24f8cd4b9a7",
  "cantidad": 2
}

#modelo de datos:
El modelo de productos tiene los siguientes campos:

id: Identificador único del producto.
nombre: Nombre del producto (string, obligatorio).
sku: Referencia del producto (string, obligatorio).
precio: Precio del producto (número entero, obligatorio).
peso: Peso del producto en gramos (número entero, obligatorio).
categoria: Categoría del producto (string, obligatorio).
stock: Cantidad disponible del producto en inventario (número entero, obligatorio).
fechaCreacion: Fecha de creación del producto (date, obligatorio).
Venta
El modelo de ventas contiene los siguientes campos:

id: Identificador único de la venta.
productoId: Referencia al producto vendido (obligatorio).
cantidad: Cantidad de producto vendida (número entero, obligatorio).
fechaVenta: Fecha en la que se realizó la venta (date, obligatorio).




