router.post("/login", async (req, res) => {
    const obtenerEmpleado = async (email, password) => {
    const empleados = await connection.query(
      `
          SELECT 
            id, nombre, apellido, email, rol, estado, fecha_creacion
          FROM empleados
          WHERE email = $1
          and password = $2
      `,
      [email, password]
    );
  
    return empleados.rows[0];
  };
  
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
  });