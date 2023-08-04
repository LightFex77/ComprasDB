const { insertarProducto } = require("../services/compras.service");

const HORAS_DIFERENCIA_UTC = new Date().getTimezoneOffset() * 60000;

const insertProducto = async (req, res) => {
  const {valor, fecha_vencimiento: fechaVencimiento, estado = "pen", tipo, cliente_id, empleado_id} = req.body;
  const fechaCreacion = new Date();
  const fechaVencimientoParseado = new Date(
    new Date(fechaVencimiento).getTime() + HORAS_DIFERENCIA_UTC
  );

  const compras = await insertarProducto(valor, fechaCreacion, fechaVencimientoParseado, estado, tipo, cliente_id, empleado_id);

  res.status(200).json({
    resultado: compras
  });
};

module.exports = {
    insertProducto
}