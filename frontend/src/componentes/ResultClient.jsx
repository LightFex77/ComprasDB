// ResultClient.js
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Input } from '../componentes/elementos/Input';
import { Button } from '../componentes/elementos/Button';
import { formatFecha } from '../utils/formatFecha';
import { ModalPagar } from './cliente/ModalPagar';
import { ModalLiquidar } from './cliente/ModalLiquidar';

export const ResultClient = () => {
  // Obtener el RUC desde la URL
  const { ruc } = useParams();
  const [dataClient, setDataClient] = useState(null);
  const [nameClient, setNameClient] = useState({
    nombre: '',
    apellido: '',
    ruc: '',
  });

  const [showPagar, setShowPagar] = useState(false);
  const [showLiquidar, setShowLiquidar] = useState(false);

  // Realizar el fetch con el RUC
  const obtenerDatosCliente = async () => {
    try {
      const endpoint = `cliente-compras?ruc=${ruc}`;
      const response = await fetch(`http://localhost:3000/${endpoint}`);
      const data = await response.json();
      // Aquí puedes hacer algo con los datos recibidos del fetch

      setDataClient(data);
      data.resultado.forEach((item) => {
        setNameClient({
          nombre: item.nombre_cliente,
          apellido: item.apellido_cliente,
          ruc: item.ruc,
        });
      });
    } catch (error) {
      console.error('Error al obtener los datos del cliente:', error);
    }
  };
  // TODO: on click
  const onChangePagar = (e) => {
    e.preventDefault();
    setShowPagar(true);
  };
  // TODO: on click
  const onChangeLiquidar = (e) => {
    e.preventDefault();
    setShowLiquidar(true);
  };
  // Llamar a la función para obtener los datos cuando el componente se monte
  useEffect(() => {
    obtenerDatosCliente();
  }, []);

  return (
    <div className="container">
      {showPagar && (
        <ModalPagar style={{ opacity: 1, pointerEvents: 'unset' }} />
      )}
      {showLiquidar && (
        <ModalLiquidar style={{ opacity: 1, pointerEvents: 'unset' }} />
      )}
      {/* style={{ opacity: 1, pointerEvents: "unset" }} */}
      <h1 className="h1Style">Cliente</h1>
      <hr className="hrStyle" />
      <section className="section-nombre">
        <Input
          value={`${nameClient.nombre} ${nameClient.apellido}`}
          readOnly={true}
        />
        <Input value={nameClient.ruc} readOnly={true} />
      </section>
      <hr className="hrStyle" />
      <section className="data-client">
        <table className="tabla-principal">
          <tr>
            <th className="informacion-de-datos">Estado</th>
            <th className="informacion-de-datos">Tipo producto</th>
            <th className="informacion-de-datos">Valor del producto</th>
            <th className="informacion-de-datos">Fecha de vencimiento</th>
            <th className="informacion-de-datos">Empleado</th>
            <th className="informacion-de-datos"></th>
          </tr>
          {dataClient ? (
            dataClient.resultado.map((item, index) => (
              <tr className="row-item" key={index}>
                <td className="datos-de-compra">{item.estado}</td>
                <td className="datos-de-compra">{item.producto}</td>
                <td className="datos-de-compra">{item.valor}</td>
                <td className="datos-de-compra">
                  {formatFecha(item.fecha_vencimiento)}
                </td>
                <td className="datos-de-compra">
                  <span>{item.nombre_empleado}</span>{' '}
                  <span>{item.apellido_empleado}</span>
                </td>
                <td className="datos-de-compra">
                  {item.estado === 'ven' ? (
                    <>
                      <Button mode="gris" textContent="Pagar" disabled={true} />
                      <Button
                        mode="gris"
                        textContent="Liquidar"
                        disabled={true}
                      />
                    </>
                  ) : (
                    <>
                      <Button textContent="Pagar" onClick={onChangePagar} />
                      <Button
                        mode="azul"
                        textContent="Liquidar"
                        onClick={onChangeLiquidar}
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
        </table>
      </section>
    </div>
  );
};
