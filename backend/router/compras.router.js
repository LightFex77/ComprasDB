const { Router } = require("express");
const { insertProducto, comprasDeHoy, comprasRuc, actualizarCompraController } = require("../controller/compras.controller")

const router = Router();

router.post('/compras', insertProducto);

router.get("/compras-de-hoy", comprasDeHoy);

router.get("/compras-por-ruc", comprasRuc);

router.post("/compras/abono", actualizarCompraController);

module.exports = router