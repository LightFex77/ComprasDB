const { getClientes, insertClient, clientsRegistrer, searchClient } = require('../controller/clientes.controller')
const { Router } = require('express')

const router = Router();

router.get("/clientes", getClientes)

router.post("/clientes", insertClient)

router.get("/clientes-registrados", clientsRegistrer);

router.get("/cliente-compras", searchClient);

module.exports = router