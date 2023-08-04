const { obtenerEmpleado } = require('../services/empleados.service');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const empleado = await obtenerEmpleado(req.body.email, req.body.password);

    if(empleado){
        console.log('El usuario exite');


        const token = jwt.sign(
            {
                empleadoId: empleado.id,
                empleadoRol: empleado.rol,
                empleadoEmail: empleado.email
            },
            "admin12345",
            {
                expiresIn: "1min"
            }
        );
        return res.status(200).json({
            empleado,
            token
        });
    }else{
        console.log('El usuario no exite');
    }
    return res.status(400).json({
        error: "El empleado no existe"
    })
}

module.exports = {
    login
}