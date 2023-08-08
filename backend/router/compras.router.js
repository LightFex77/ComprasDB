const { Router } = require("express");
const { insertProducto } = require("../controller/compras.controller")

const router = Router();

router.post('/compras', insertProducto)
// TODO: buscar compras por cliente ruc

module.exports = router