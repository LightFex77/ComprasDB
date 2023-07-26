const { getClientes, insertClient } = require('../controller/clientes.controller')
const { Router } = require('express')

const router = Router();

router.get("/clientes", getClientes)

router.post("/clientes", insertClient)

module.exports = router