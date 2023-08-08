const pg = require('pg');

const connection = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "admin123",
    port: 5432,
    database: "postgres",
});

const insertarProducto = async (valor, fechaCreacion, fechaVencimientoParseado, estado, tipo, cliente_id, empleado_id) => {
    const nuevaCompra = await connection.query(`
    INSERT INTO public.compras(
        valor, fecha_creacion, fecha_vencimiento, estado, tipo, cliente_id, empleado_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [valor, fechaCreacion, fechaVencimientoParseado, estado, tipo, cliente_id, empleado_id])
    return nuevaCompra.rows;
}

module.exports = {
    insertarProducto
}