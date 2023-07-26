const { obtenerTipoProducto } = require("../services/tipoProducto.service");

const getTipoProducto = async (req, res) => {
  const tipoProductos = await obtenerTipoProducto();

  res.status(200).json({
    resultado: tipoProductos.rows,
  });
};

module.exports = {
  getTipoProducto,
};
