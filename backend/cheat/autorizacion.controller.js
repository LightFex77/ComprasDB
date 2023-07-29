const { obtenerEmpleado } = require("../services/empleado.service");
const jwt = require("jsonwebtoken");

const loginEmployee = async (req, res) => {
  const empleado = await obtenerEmpleado(req.body.email, req.body.password);

  if (empleado) {
    const token = jwt.sign(
      {
        empleadoId: empleado.id,
        empleadoRol: empleado.rol,
        empleadoEmail: empleado.email,
      },
      "firma-secreta-de-andres",
      {
        expiresIn: "24h"
      }
    );

    return res.status(200).json({
      empleado,
      token,
    });
  }

  return res.status(400).json({
    error: "Empleado no existe",
  });
};

const verificarEmpleado = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
      jwt.verify(token, "firma-secreta-de-andres");
    
      next();
  } catch (error) {
    console.log("error ->", error, req.headers);
    return res.status(400).json({
        error: "Token no valido"
    })
  }

};

module.exports = {
  loginEmployee,
  verificarEmpleado,
};
