import { useEffect, useState } from "react";
import { Button } from "../elementos/Button";
import { Input } from "../elementos/Input";
import { Select } from "../elementos/Select";
import "../../styles/sectionCompra.css";
import { ModalCompra } from "./ModalCompra";
// import { ModalCompra } from "./ModalCompra";

export const FormularioCompra = () => {
  const [valor, setValor] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [tipoProducto, setTipoProducto] = useState("");
  const [listaDeTipos, setListaDeTipos] = useState([]);
  const [ruc, setRuc] = useState("");
  const [clienteId, setClienteId] = useState(null);

  const [clientInfo, setClientInfo] = useState({ nombre: "", apellido: "" });
  useEffect(() => {
    async function compraLista() {
      try {
        //buscar la base de datos y obtenerla GET
        const backendUrl = "http://localhost:3000";
        const respuestaBd = await fetch(backendUrl + "/tipo-producto", {
          method: "GET",
        });

        //Obtener los datos en JSON
        const bdJson = await respuestaBd.json();
        const resultado = bdJson.resultado;

        setListaDeTipos(resultado);
      } catch (error) {
        console.log({ error });
      }
    }
    //Hacer que la funcion se ejecute cada vez que se inicia la pagina
    compraLista();
  }, []);

  const [rucInvalido, setRucInvalido] = useState("");
  const [modalShow, setModalShow] = useState(false);

  // const handleModalShowTrue = (e) => {
  //   e.preventDefault()
  //   setModalShow(true)
  //   {setRucInvalido("")}
  // };

  const handleModalShowFalse = (e) => {
    e.preventDefault();
    setModalShow(false);
    {
      setRucInvalido("");
    }
  };

  const crearForm = async (e) => {
    e.preventDefault();

    const data = {
      valor: valor,
      fecha_vencimiento: fechaVencimiento,
      tipo: parseInt(tipoProducto),
      cliente_id: clienteId,
    };

    await fetch("http://localhost:3000/compras", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const buscarRuc = async (e) => {
    e.preventDefault();

    const respuestaBd = await fetch(
      "http://localhost:3000/clientes?ruc=" + ruc,
      {
        method: "GET",
      }
    );

    const bdJson = await respuestaBd.json();
    const clientesJson = bdJson.resultado;

    if (clientesJson) {
      const newClienteId = clientesJson.id;
      setClienteId(newClienteId);

      const { nombre, apellido } = clientesJson;

      setClientInfo({ nombre, apellido });
    } else {
      setRucInvalido(
        <div className="crear-ruc">
          <span className="text-crear-ruc">
            El cliente RUC: <b>({ruc})</b> no existe <br />
            ¿Desea Crearlo?
            <br />
          </span>
          <div className="buttons-crear-ruc">
            <Button
              mode="azul"
              textContent="Si"
              onClick={() => setModalShow(true)}
            />
            <Button
              mode="azul"
              textContent="No"
              onClick={handleModalShowFalse}
            />
          </div>
        </div>
      );
      setClienteId(null);
      setClientInfo({ nombre: "", apellido: "" });
    }
  };

  return (
    <div className="container">
      {modalShow && (
        <ModalCompra
          styleModal={{ opacity: 1, pointerEvents: "unset" }}
          setModalShow={setModalShow} // Pasar la función al componente ModalCompra
        />
      )}
      <h1 className="ingresar-compra">Ingresar Compra</h1>
      <form className="formCompra" id="compras" onSubmit={crearForm}>
        <hr />
        <div className="producto-container">
          <Select
            id="tipoProducto"
            name="tipoProducto"
            labelText="Tipo Producto"
            selectTipo="Seleciona un tipo"
            value={tipoProducto}
            options={listaDeTipos}
            onChange={(e) => setTipoProducto(e.target.value)}
          />
          <div className="producto-valor">
            <Input
              id="valorInput"
              name="valor"
              labelText="Valor del producto"
              placeholder="$123.000"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />

            <Input
              id="fechaVencimientoInput"
              name="fecha_vencimiento"
              type="date"
              labelText="Fecha de Vencimiento"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
            />
          </div>
        </div>

        <hr />

        {/* <section id="rucNoMarcado" className="dialogo-no-marcado">
          <p>Compra marcada sin cliente</p>
        </section> */}
        <div className="cliente-ruc-container">
          <div className="search-client">
            <Input
              id="clienteInput"
              name="clienteInput"
              type="text"
              labelText="Cliente RUC"
              placeholder="123456789"
              value={ruc}
              classNameContainer="search-client-input"
              onChange={(e) => setRuc(e.target.value)}
            />
            <Button
              id="botonBuscar"
              textContent="Buscar RUC"
              mode="azul"
              onClick={buscarRuc}
            />
            <Button
              id="botonMarcar"
              textContent="Marcar sin cliente"
              mode="azul-suave"
            />
          </div>
          {rucInvalido}
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
        </div>

        <Button
          type="sumbit"
          textContent="Guardar"
          id="guardarButton"
          // onClick={(e) => {
          //   e.preventDefault();
          //   console.log({
          //     valor,
          //     tipoProducto,
          //     fechaVencimiento,
          //   });
          // }}
        />
      </form>
    </div>
  );
};
