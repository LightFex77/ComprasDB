const pg = require("pg");

//Conectar a la base de datos
const connection = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  port: 5432,
  database: "postgres",
});

const obtenerTipoProducto = async () => {
  const tipoProductos = await connection.query(`
        SELECT * FROM tipo_producto;
    `);
  return tipoProductos.rows;
};

module.exports = {
  obtenerTipoProducto
}