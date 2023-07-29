const { Router } = require("express");
const { loginEmployee, verificarEmpleado } = require("../controller/autorizacion.controller");

const router = Router();

router.post("/login", loginEmployee);

module.exports = router;
