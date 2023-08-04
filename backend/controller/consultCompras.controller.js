const { consultarCompras } = require('../services/consultCompra.service');

const comprasDeHoy = async (req, res) => {
    const compras = await consultarCompras();
  
    res.status(200).json({
      resultado: compras,
    });
  };
  
  module.exports = {
    comprasDeHoy
  };