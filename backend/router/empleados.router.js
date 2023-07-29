const { login } = require('../controller/empleados.controller')
const { Router } = require('express');

const router = Router();

router.post('/empleados', login);

module.exports = router;

