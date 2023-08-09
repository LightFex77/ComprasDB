const pg = require("pg");

const connection = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  port: 5432,
  database: "postgres",
});

const insertarProducto = async (
  valor,
  fechaCreacion,
  fechaVencimientoParseado,
  estado,
  tipo,
  cliente_id,
  empleado_id
) => {
  const nuevaCompra = await connection.query(
    `
    INSERT INTO public.compras(
        valor, fecha_creacion, fecha_vencimiento, estado, tipo, cliente_id, empleado_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    [
      valor,
      fechaCreacion,
      fechaVencimientoParseado,
      estado,
      tipo,
      cliente_id,
      empleado_id,
    ]
  );
  return nuevaCompra.rows;
};

const consultarCompras = async () => {
  const compras = await connection.query(
    `
     SELECT
     c.id,
     cl.nombre as cliente_nombre,
     cl.apellido as cliente_apellido,
     cl.ruc,
     e.nombre as empleado_nombre,
     e.apellido as empleado_apellido,
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
  );
  return compras.rows;
};

const comprasPorRuc = async (ruc) => {
  try {
    const values = [ruc];
    const query = `
    SELECT 
    c.id,
    c.valor,
    c.fecha_vencimiento,
    c.estado,
    tp.texto as producto,
    cl.nombre as cliente_nombre,
    cl.apellido as cliente_apellido,
    cl.ruc,
    e.nombre as empleado_nombre,
    e.apellido as empleado_apellido

    FROM compras as c
    INNER JOIN clientes as cl
    ON c.cliente_id = cl.id
    
    INNER JOIN empleados as e
    ON c.empleado_id = e.id

    INNER JOIN tipo_producto as tp
    ON c.tipo = tp.id
    WHERE cl.ruc = $1;
    `;
    // INNER JOIN public.clientes as cl
    // ON c.cliente_id = cl.id
    // const values = [id];
    const result = await connection.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error al buscar RUC");
  }
};

module.exports = {
  insertarProducto,
  consultarCompras,
  comprasPorRuc,
};
