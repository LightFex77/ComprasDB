const { getClientes, insertClient, clientsRegistrer, searchClient } = require('../controller/clientes.controller')
const { Router } = require('express')

const router = Router();

router.get("/clientes", getClientes)

router.post("/clientes", insertClient)

// TODO: Trae todo los clientes registrados, lo necesitamos?
router.get("/clientes-registrados", clientsRegistrer);

// TODO: Busca todos los clientes por el RUC o el apellido o el nombre, junto con sus compras
router.get("/cliente-compras", searchClient);

// router.get("/clientes/buscar", buscarCliente);
module.exports = router