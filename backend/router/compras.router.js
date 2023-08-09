const { Router } = require("express");
const { insertProducto, comprasDeHoy, comprasRuc } = require("../controller/compras.controller")

const router = Router();

router.post('/compras', insertProducto);

router.get("/compras-de-hoy", comprasDeHoy);

router.get("/compras-por-ruc", comprasRuc);

module.exports = router