import "../styles/sectionComprasHoy.css";
import { useEffect, useState } from "react";
import { formatFecha } from "../utils/formatFecha";
import { useRedirectToLogin } from "../hooks/redirectLogin";

export const ComprasHoy = () => {
  const [infoCompras, setInfoCompras] = useState(null);

  useRedirectToLogin();

  const comprasDelDia = async () => {
    const respuestaBd = await fetch("http://localhost:3000/compras-de-hoy", {
      method: "GET",
    });
    const bdJson = await respuestaBd.json();
    const resultado = bdJson.resultado;

    setInfoCompras(resultado);
  };
  useEffect(() => {
    comprasDelDia();
  }, []);

  return (
    <div className="container" id="comprasHoy">
      <h1 className="h1Style">Compras de hoy</h1>
      <hr className="hrStyle" />
      <table className="tabla-principal">
        <tr>
          <th className="informacion-de-datos">Tipo producto</th>
          <th className="informacion-de-datos">Valor del producto</th>
          <th className="informacion-de-datos">Fecha de vencimiento</th>
          <th className="informacion-de-datos">Cliente</th>
          <th className="informacion-de-datos">Empleado</th>
        </tr>
        {infoCompras ? (
          infoCompras.map((item) => (
            <tr className="row-item" key={item.id}>
              <td className="datos-de-compra">{item.texto}</td>
              <td className="datos-de-compra">{item.valor}</td>
              <td className="datos-de-compra">{formatFecha(item.fecha_vencimiento)}</td>
              <td className="datos-de-compra">{item.nombre_cliente}</td>
              <td className="datos-de-compra">
                <span>{item.nombre_empleado}</span>{" "}
                <span>{item.apellido_empleado}</span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>
                Cargando...
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};
