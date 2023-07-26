const pg = require("pg");

const connection = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  port: 5432,
  database: "postgres",
});

const obtenerClientePorRUC = async (ruc) => {
  const clientes = await connection.query(
    `
        SELECT * FROM clientes
        WHERE ruc = $1
    `,
    [ruc]
  );

  return clientes.rows[0];
};

const insertarCliente = async (ruc, ruc_tipo, nombre, apellido, estado) => {
  const nuevoCliente = await connection.query(
    `
    INSERT INTO public.clientes(
        ruc, ruc_tipo, nombre, apellido, estado)
        VALUES ($1, $2, $3, $4, $5);
    `,
    [ruc, ruc_tipo, nombre, apellido, estado]
  );

  return await obtenerClientePorRUC(ruc);
};

module.exports = {
  obtenerClientePorRUC,
  insertarCliente,
};
