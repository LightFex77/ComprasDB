const connection = require("../db/connectionDb");

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
     cl.nombre as nombre_cliente,
     cl.apellido as apellido_cliente,
     cl.ruc,
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
  );
  return compras.rows;
};

const comprasPorRuc = async (ruc) => {
  try {
    const values = [ruc];
    const query = `
    SELECT 
    c.id as compra_id,
    e.id as empleado_id,
    c.valor,
    c.fecha_vencimiento,
    c.estado,
    tp.texto as producto,
    cl.nombre as cliente_nombre,
    cl.apellido as cliente_apellido,
    cl.ruc,
    e.nombre as empleado_nombre,
    e.apellido as empleado_apellido,
    COALESCE((SELECT SUM(a.valor) FROM public.abonos AS a WHERE a.compra_id = c.id), 0) AS valor_pagado

    FROM compras as c
    INNER JOIN clientes as cl
    ON c.cliente_id = cl.id
    
    INNER JOIN empleados as e
    ON c.empleado_id = e.id

    INNER JOIN tipo_producto as tp
    ON c.tipo = tp.id
    WHERE cl.ruc = $1

    ORDER BY c.fecha_creacion desc;
    `;
    
    const result = await connection.query(query, values);
    return result.rows.map(m => {
      m.valor_faltante = m.valor - m.valor_pagado
      return m;
    })
  } catch (error) {
    console.error("Error al buscar RUC", error);
  }
};

const insertarAbono = async (
  valor,
  fecha_creacion,
  empleado_id,
  compra_id,
  estado,
  dias
) => {
  const query = `
    INSERT INTO public.abonos(
      fecha_creacion, empleado_id, compra_id, estado, valor, dias)
      VALUES ($1, $2, $3, $4, $5, $6);
      `;
  const values = [fecha_creacion, empleado_id, compra_id, estado, valor, dias];
  const abono = await connection.query(query, values);
  return abono.rows;
};

const actualizarCompra = async (compra_id, estado, dias) => {
  const updateQuery = `
  UPDATE public.compras AS c
  SET fecha_vencimiento = c.fecha_vencimiento + $2::integer, estado = $3
  WHERE id = $1;
    `;
  const valuesUpdateQuery = [compra_id, dias, estado];
  const update = await connection.query(updateQuery, valuesUpdateQuery);

  return update.rows;
};
module.exports = {
  insertarProducto,
  consultarCompras,
  comprasPorRuc,
  insertarAbono,
  actualizarCompra,
};
