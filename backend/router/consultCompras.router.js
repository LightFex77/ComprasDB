const { comprasDeHoy } = require('../controller/consultCompras.controller');
const { Router } = require('express');

const router = Router();

router.get("/compras-de-hoy", comprasDeHoy);

module.exports = router;