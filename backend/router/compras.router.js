const { Router } = require("express");
const { insertProducto, comprasDeHoy } = require("../controller/compras.controller")

const router = Router();

router.post('/compras', insertProducto);

router.get("/compras-de-hoy", comprasDeHoy);

module.exports = router