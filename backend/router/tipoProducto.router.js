const { getTipoProducto } = require("../controller/tipoProducto.controller");
const { Router } = require("express");

const router = Router();

router.get("/tipo-producto", getTipoProducto);

module.exports = router;
