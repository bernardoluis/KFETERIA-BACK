
#Cafetería Konecta - Backend
Este es el backend de la aplicación Cafetería Konecta, desarrollada en Node.js 

#Requisitos
Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:
Node.js (v14 o superior)
mysql

#instalar dependencias
npm install

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





