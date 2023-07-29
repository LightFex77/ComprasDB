const { Router } = require("express");
const { insertProducto } = require("../controller/compras.controller")

const router = Router();

router.post('/compras', insertProducto)

module.exports = router