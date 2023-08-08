const { getClientes, insertClient, searchClient } = require('../controller/clientes.controller')
const { Router } = require('express')

const router = Router();

router.get("/clientes", getClientes)

router.post("/clientes", insertClient)

router.get("/cliente-compras", searchClient);

module.exports = router