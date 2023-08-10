const connection = require("../db/connectionDb");

const obtenerTipoProducto = async () => {
  const tipoProductos = await connection.query(`
        SELECT * FROM tipo_producto;
    `);
  return tipoProductos.rows;
};

module.exports = {
  obtenerTipoProducto
}