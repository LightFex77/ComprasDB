import { Button } from "../elementos/Button";
import { Input } from "../elementos/Input";
import "../../styles/modalCompra.css";
import { useState } from "react";

export const ModalCompra = ({ setModalShow, modalShow, onClienteCreado }) => {
  const [ruc, setRuc] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [sendRuc, setSendRuc] = useState(false);
  const [sendNombre, setSendNombre] = useState(false);
  const [sendApellido, setSendApellido] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    setModalShow(false); // Cerrar el modal al hacer clic en el botón "Cancelar"
  };

  const validarRuc = () => {
    const val = parseInt(ruc);
    return !isNaN(val) && val > 0;
  };

  const validarNombre = () => {
    return isNaN(nombre) && nombre !== "";
  };
  const validarApellido = () => {
    return isNaN(apellido) && apellido !== "";
  };
  const crearRuc = async (e) => {
    e.preventDefault();

    if (!validarRuc()) setSendRuc(true);
    if (!validarNombre()) setSendNombre(true);
    if (!validarApellido()) setSendApellido(true);

    const data = {
      ruc: ruc,
      nombre: nombre,
      apellido: apellido,
    };

    if (validarRuc() && validarNombre() && validarApellido()) {
      await fetch("http://localhost:3000/clientes", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setModalShow(false);
      onClienteCreado(ruc);
    }
  };

  return (
    <section
      id="modal"
      className="modal"
      style={
        modalShow
          ? {
              opacity: 1,
              pointerEvents: "auto",
            }
          : null
      }
    >
      <div className="modal-container">
        <form className="form-cliente" id="clientes" onSubmit={crearRuc}>
          <Input
            id="ruc"
            name="ruc"
            type="text"
            labelText="Ruc"
            placeholder="123456789"
            value={ruc}
            error={sendRuc && !validarRuc() ? "Introduzca un RUC Valido" : null}
            onChange={(e) => {
              setRuc(e.target.value);
              setSendRuc(true);
            }}
          />
          <Input
            id="nombreRuc"
            name="nombreRuc"
            labelText="Nombre"
            placeholder="Juan"
            value={nombre}
            error={sendNombre && !validarNombre() ? "Nombre Invalido" : null}
            onChange={(e) => {
              setNombre(e.target.value);
              setSendNombre(true);
            }}
          />

          <Input
            id="apellidoRuc"
            name="apellidoRuc"
            type="text"
            labelText="Apellido"
            placeholder="Pepe"
            value={apellido}
            error={
              sendApellido && !validarApellido() ? "Apellido invalido" : null
            }
            onChange={(e) => {
              setApellido(e.target.value);
              setSendApellido(true);
            }}
          />

          <Button id="guardarRuc" textContent="Guardar" />
          <Button
            id="rucCancel"
            className="ruc-cancel"
            type="button"
            textContent="Cancelar"
            onClick={handleCancel}
          />
        </form>
      </div>
    </section>
  );
};
