const {
  obtenerClientePorRUC,
  insertarCliente,
} = require("../services/clientes.service");

const getClientes = async (req, res) => {
  const ruc = req.query.ruc;

  if (!ruc) {
    return res.status(400).json({
      error: "Falta el ruc",
    });
  }

  const cliente = await obtenerClientePorRUC(ruc);

  res.status(200).json({
    resultado: cliente,
  });
};

const insertClient = async (req, res) => {
  try {
    const {
      ruc,
      ruc_tipo = "natural",
      nombre,
      apellido,
      estado = "act",
    } = req.body;

    const cliente = await insertarCliente(
      ruc,
      ruc_tipo,
      nombre,
      apellido,
      estado
    );

    res.status(200).json({
      resultado: cliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ha ocurrido un error, intenta mas tarde o contacta al desarrollador",
    });
  }
};

module.exports = {
  getClientes,
  insertClient,
};
