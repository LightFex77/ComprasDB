const pg = require('pg');

const connection = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "admin123",
    port: 5432,
    database: "postgres",
  });

  const consultarCompras = async () => {    
   const compras = await connection.query(
    `
    SELECT
    c.id,
    cl.nombre as nombre_cliente,
    cl.apellido as apellido_cliente,
	  e.nombre as nombre_empleado,
    e.apellido as apellido_empleado,
    p.texto,
    c.valor,
    c.fecha_vencimiento

    FROM public.compras as c
    INNER JOIN public.tipo_producto as p
    ON c.tipo = p.id

    LEFT JOIN public.clientes as cl
    ON c.cliente_id = cl.id

    INNER JOIN public.empleados as e
    on c.empleado_id = e.id
    `
   )
   return compras.rows
  }

  module.exports = {
    consultarCompras
  }