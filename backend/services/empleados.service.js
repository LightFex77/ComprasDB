const connection = require("../db/connectionDb");

const obtenerEmpleado = async (email, password) => {
  const empleados = await connection.query(`
    SELECT 
        id, nombre, apellido, email, rol, estado, fecha_creacion
        FROM empleados
        WHERE email = $1
        and password = $2
    `,
    [email, password]);

  return empleados.rows[0];
};

module.exports = {
  obtenerEmpleado
}
