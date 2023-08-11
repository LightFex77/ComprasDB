import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../elementos/Button";
import { Input } from "../elementos/Input";
import { Select } from "../elementos/Select";
import "../../styles/sectionCompra.css";
import { ModalCompra } from "./ModalCompra";
// import { ModalCompra } from "./ModalCompra";
import { useTipoProductos } from "../../hooks/useTipoProductos";
import {
  validarFecha,
  validarSearchRuc,
  validarTipo,
  validarValor,
} from "../../utils/validarCompra";

export const FormularioCompra = () => {
  const history = useHistory();

  const [valor, setValor] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [tipoProducto, setTipoProducto] = useState("");
  const [ruc, setRuc] = useState("");
  const [clienteId, setClienteId] = useState(null); //devuelve el cliente_id
  const [clientCheck, setClientCheck] = useState(false); //Marcar y desmarcar una compra

  const [clientInfo, setClientInfo] = useState({ nombre: "", apellido: "" }); //si existe el ruc de la persona mostramos su nombre y apellido

  const [rucInvalido, setRucInvalido] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [errorValor, setErrorValor] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [errorTipo, setErrorTipo] = useState("");
  const [errorRucValor, setErrorRucValor] = useState("");

  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const empleadoGuardado = localStorage.getItem("empleado");
    if (empleadoGuardado) {
      const empleadoJson = JSON.parse(empleadoGuardado);
      setEmpleado(empleadoJson);
    } else {
      // devolver al login
      history.push("/login");
    }
  }, []);

  const listaDeTipos = useTipoProductos();

  const onCheck = (e) => {
    e.preventDefault();
    setRucInvalido(null);

    if (!clientCheck) {
      setClientCheck(true);
      setClientInfo({ nombre: "", apellido: "" });
      setClienteId(null);
    } else {
      // Si clientCheck es verdadero, establecemos clienteId en prevClienteId
      setClientCheck(false);
    }
    console.log(clienteId);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalShow(true);
    setRucInvalido(null);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setModalShow(false);
    setRucInvalido(null);
  };

  const crearForm = async (e) => {
    e.preventDefault();
    setErrorValor("");
    setErrorFecha("");
    setErrorTipo("");
    console.log("HOLA");

    const esValorValido = validarValor(valor);
    const esFechaValido = validarFecha(fechaVencimiento);
    const esTipoValido = validarTipo(tipoProducto);

    if (esValorValido && esFechaValido && esTipoValido) {
      const data = {
        valor: valor,
        fecha_vencimiento: fechaVencimiento,
        tipo: parseInt(tipoProducto),
        cliente_id: clienteId,
        empleado_id: empleado.empleado.id,
      };

      await fetch("http://localhost:3000/compras", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert('¡La compra se creo con exito!')
    } else {
      if (!esValorValido) setErrorValor("Valor invalido");
      if (!esFechaValido) setErrorFecha("Fecha no valida");
      if (!esTipoValido) setErrorTipo("Eliga una opción");
    }
  };

  const buscarCliente = async (ruc) => {
    if (validarSearchRuc(ruc)) {
      const respuestaBd = await fetch(
        "http://localhost:3000/clientes?ruc=" + ruc,
        {
          method: "GET",
        }
      );

      const bdJson = await respuestaBd.json();
      const clientesJson = bdJson.resultado;
      return clientesJson;
    }
  };

  const buscarRuc = async (e) => {
    e.preventDefault();
    setRucInvalido(null);
    setErrorRucValor("");

    if (!validarSearchRuc(ruc)) {
      setErrorRucValor("Ingrese un RUC valido");
    } else {
      const clientesJson = await buscarCliente(ruc);

      if (clientesJson) {
        const newClienteId = clientesJson.id;
        const { nombre, apellido } = clientesJson;

        setClienteId(newClienteId);
        setClientInfo({ nombre, apellido });
      } else {
        setRucInvalido(ruc);

        setClienteId(null);
        setClientInfo({ nombre: "", apellido: "" });
      }
    }
  };

  const handleClienteCreado = async (ruc) => {
    const nuevoCliente = await buscarCliente(ruc);
    const { id: newClienteId, nombre, apellido } = nuevoCliente;
    setClienteId(newClienteId);
    setClientInfo({ nombre, apellido });
    setRucInvalido(null);
  };

  const clientInputs = clienteId !== null;

  return (
    <div className="container" id="ingresarCompras">
      <ModalCompra
        modalShow={modalShow}
        setModalShow={setModalShow} // Pasar la función al componente ModalCompra
        onClienteCreado={handleClienteCreado}
      />
      <h1 className="h1Style">
        Ingresar Compra - {empleado?.empleado?.nombre}
      </h1>
      <form className="formCompra" id="compras" onSubmit={crearForm}>
        <hr className="hrStyle" />
        <div className="producto-container">
          <Select
            id="tipoProducto"
            name="tipoProducto"
            labelText="Tipo Producto"
            selectTipo="Seleciona un tipo"
            value={tipoProducto}
            options={listaDeTipos}
            error={errorTipo}
            onChange={(e) => setTipoProducto(e.target.value)}
          />
          <div className="producto-valor">
            <Input
              id="valorInput"
              name="valor"
              labelText="Valor del producto"
              placeholder="$123.000"
              value={valor}
              error={errorValor}
              onChange={(e) => setValor(e.target.value)}
              classNameContainer="search-client-input"
              clase="search-client-input input"
              onBlur={() => {
                const esValorValido = validarValor(valor);
                if (!esValorValido) setErrorValor("Valor invalido");
                else setErrorValor("");
              }}
            />

            <Input
              id="fechaVencimientoInput"
              name="fecha_vencimiento"
              type="date"
              labelText="Fecha de Vencimiento"
              value={fechaVencimiento}
              error={errorFecha}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              clase="search-client-input input"
              classNameContainer="search-client-input"
            />
          </div>
        </div>

        <hr className="hrStyle" />

        <div className="cliente-ruc-container">
          <section className="ruc-section">
            <div className="search-client">
              <Input
                id="clienteInput"
                name="clienteInput"
                type="text"
                labelText="Cliente RUC"
                placeholder="123456789"
                value={ruc}
                error={errorRucValor}
                classNameContainer="search-client-input"
                onChange={(e) => setRuc(e.target.value)}
              />
              <Button
                id="botonBuscar"
                textContent="Buscar RUC"
                mode="azul"
                onClick={buscarRuc}
              />
              {clientCheck ? (
                <section id="rucNoMarcado" className="dialogo-no-marcado">
                  <p>Compra marcada sin cliente</p>
                </section>
              ) : null}
            </div>
            <Button
              id="botonMarcar"
              textContent={
                clientCheck ? "Marcar con cliente" : "Marcar sin cliente"
              }
              mode={clientCheck ? "azul" : "azul-suave"}
              onClick={onCheck}
            />
          </section>
          {rucInvalido && (
            <div className="crear-ruc">
              <span className="text-crear-ruc">
                El cliente RUC: <b>({rucInvalido})</b> no existe <br />
                ¿Desea Crearlo?
                <br />
              </span>
              <div className="buttons-crear-ruc">
                <Button
                  mode="azul"
                  textContent="Si"
                  onClick={handleOpenModal}
                />
                <Button
                  mode="azul"
                  textContent="No"
                  onClick={handleCloseModal}
                />
              </div>
            </div>
          )}
          {clientInputs && (
            <section id="clienteRuc" className="cliente-ruc">
              <Input
                id="nombreRuc"
                name="nombre"
                type="text"
                value={clientInfo.nombre}
                labelText="Nombre"
                readOnly={true}
              />
              <Input
                id="apellidoRuc"
                name="apellido"
                value={clientInfo.apellido}
                type="text"
                labelText="Apellido"
                readOnly={true}
              />
            </section>
          )}
        </div>

        <Button
          type="sumbit"
          textContent="Guardar"
          id="guardarButton"
          className="save-button"
        />
      </form>
    </div>
  );
};
