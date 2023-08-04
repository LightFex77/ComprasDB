const { login } = require('../controller/empleados.controller')
const { Router } = require('express');

const router = Router();

router.post('/login', login);

module.exports = router;

