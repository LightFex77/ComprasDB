const {
  obtenerClientePorRUC,
  insertarCliente,
  buscarCliente
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
      error:
        "Ha ocurrido un error, intenta mas tarde o contacta al desarrollador",
    });
  }
};

const searchClient = async (req, res) => {
const {buscar} = req.query;

try{
  const resultados = await buscarCliente(buscar);
  res.status(200).json({
    resultado: resultados
  })
}catch(error){
  res.status(500).json({
    error: "Error al buscar el RUC"
  })
}
}

// const buscarCliente = () => {
// const {buscar} = req.query;
// }

module.exports = {
  getClientes,
  insertClient,
  searchClient
};

