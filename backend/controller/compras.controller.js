const {
  insertarProducto,
  consultarCompras,
  comprasPorRuc,
  insertarAbono,
  actualizarCompra,
} = require("../services/compras.service");

const HORAS_DIFERENCIA_UTC = new Date().getTimezoneOffset() * 60000;

const insertProducto = async (req, res) => {
  const {
    valor,
    fecha_vencimiento: fechaVencimiento,
    estado = "pen",
    tipo,
    cliente_id,
    empleado_id,
  } = req.body;
  const fechaCreacion = new Date();
  const fechaVencimientoParseado = new Date(
    new Date(fechaVencimiento).getTime() + HORAS_DIFERENCIA_UTC
  );

  const compras = await insertarProducto(
    valor,
    fechaCreacion,
    fechaVencimientoParseado,
    estado,
    tipo,
    cliente_id,
    empleado_id
  );

  res.status(200).json({
    resultado: compras,
  });
};

const comprasDeHoy = async (req, res) => {
  const compras = await consultarCompras();

  res.status(200).json({
    resultado: compras,
  });
};

const comprasRuc = async (req, res) => {
  const { ruc } = req.query;
  try {
    const compras = await comprasPorRuc(ruc);
    res.status(200).json({
      resultado: compras,
    });
  } catch (error) {
    console.error("Error al buscar RUC:", error);
    res.status(500).json({ error: "Error al buscar RUC" });
  }
};

const actualizarCompraController = async (req, res) => {
  const { valor, empleado_id, compra_id, estado = "act", dias } = req.body;

  const fechaCreacion = new Date();

  const abono = await insertarAbono(
    valor,
    fechaCreacion,
    empleado_id,
    compra_id,
    estado,
    dias
  );

  const update = await actualizarCompra(compra_id, estado, dias);

  res.status(200).json({
    resultado: { abono: abono, update: update },
  });
};

module.exports = {
  comprasRuc,
  insertProducto,
  comprasDeHoy,
  actualizarCompraController,
};
