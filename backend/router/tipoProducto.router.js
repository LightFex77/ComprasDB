const { getTipoProducto } = require("../controller/tipoProducto.controller");
const { Router } = require("express");

const router = Router();

const hola = (req, res, next) => {
  console.log("Hola!");
  next();
};

router.get("/tipo-producto", hola, getTipoProducto);

module.exports = router;
