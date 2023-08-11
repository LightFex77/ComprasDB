import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../componentes/elementos/Input";
import { Button } from "../componentes/elementos/Button";
import { formatFecha } from "../utils/formatFecha";
import { ModalPagar } from "./cliente/ModalPagar";
import { ModalLiquidar } from "./cliente/ModalLiquidar";
import { estadosCompra } from "../utils/estadosCompra";

export const ResultClient = () => {
  const { ruc } = useParams();
  const [dataClient, setDataClient] = useState(null);
  const [nameClient, setNameClient] = useState({
    nombre: "",
    apellido: "",
    ruc: "",
  });

  const [showPagar, setShowPagar] = useState(false);
  const [showLiquidar, setShowLiquidar] = useState(false);

  const obtenerDatosCliente = async () => {
    try {
      const endpoint = `compras-por-ruc?ruc=${ruc}`;
      const response = await fetch(`http://localhost:3000/${endpoint}`);
      const data = await response.json();

      console.log(data.resultado);
      setDataClient(data);

      const {
        cliente_nombre,
        cliente_apellido,
        ruc: ruc_client,
      } = data.resultado[0];

      setNameClient({
        nombre: cliente_nombre,
        apellido: cliente_apellido,
        ruc: ruc_client,
      });
    } catch (error) {
      console.error("Error al obtener los datos del cliente:", error);
    }
  };

  const onClickPagar = (e) => {
    e.preventDefault();
    setShowPagar(true);
  };

  const onClickLiquidar = (e) => {
    e.preventDefault();
    setShowLiquidar(true);
  };

  useEffect(() => {
    obtenerDatosCliente();
  }, []);

  return (
    <div className="container">
      {showPagar && (
        <ModalPagar
          dataClient={dataClient}
          setShowPagar={setShowPagar}
          style={{ opacity: 1, pointerEvents: "unset" }}
        />
      )}
      {showLiquidar && (
        <ModalLiquidar
          setShowLiquidar={setShowLiquidar}
          style={{ opacity: 1, pointerEvents: "unset" }}
        />
      )}
      <h1 className="h1Style">Cliente</h1>
      <hr className="hrStyle" />
      <section className="section-nombre">
        <Input
          value={`${nameClient.nombre} ${nameClient.apellido}`}
          readOnly={true}
          classNameContainer="result-nombres"
          labelText="Nombre"
        />
        <Input
          value={nameClient.ruc}
          readOnly={true}
          classNameContainer="result-nombres"
          labelText="RUC"
        />
      </section>
      <hr className="hrStyle" />

      <table className="tabla-principal">
        <thead>
          <tr>
            <th className="informacion-de-datos">Estado</th>
            <th className="informacion-de-datos">Tipo producto</th>
            <th className="informacion-de-datos">Valor del producto</th>
            <th className="informacion-de-datos">Fecha de vencimiento</th>
            <th className="informacion-de-datos">Valor Pagado</th>
            <th className="informacion-de-datos">Valor Faltante</th>
            <th className="informacion-de-datos">Empleado</th>
            <th className="informacion-de-datos"></th>
          </tr>
        </thead>
        <tbody>
          {dataClient ? (
            dataClient.resultado.map((item, index) => (
              <tr className={`row-item estado-de-${item.estado}`} key={index}>
                <td className="datos-de-compra">
                  {estadosCompra(item.estado)}
                </td>
                <td className="datos-de-compra">{item.producto}</td>
                <td className="datos-de-compra">{item.valor}</td>
                <td className="datos-de-compra">
                  {formatFecha(item.fecha_vencimiento)}
                </td>
                <td className="datos-de-compra">{item.valor_pagado}</td>
                <td className="datos-de-compra">{item.valor_faltante}</td>
                <td className="datos-de-compra">
                  <span>{item.empleado_nombre}</span>{" "}
                  <span>{item.empleado_apellido}</span>
                </td>
                <td className="datos-de-compra botones-de-pago">
                  {item.estado === "ven" ? (
                    <>
                      <Button
                        mode="gris"
                        textContent="Pagar"
                        disabled={false} // Cambiado a false
                      />
                      <Button
                        mode="gris"
                        textContent="Liquidar"
                        disabled={false} // Cambiado a false
                      />
                    </>
                  ) : (
                    <>
                      <Button textContent="Pagar" onClick={onClickPagar} />
                      <Button
                        mode="azul"
                        textContent="Liquidar"
                        onClick={onClickLiquidar}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Cargando...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
