import { Button } from "../elementos/Button";
import { Input } from "../elementos/Input";
import { Label } from "../elementos/label";
import { SpanError } from "../elementos/SpanError";
import "../../styles/modalCompra.css";
import { useState } from "react";

export const ModalCompra = ({ styleModal, setModalShow}) => {
  const [ruc, setRuc] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
    setModalShow(false); // Cerrar el modal al hacer clic en el botón "Cancelar"
  };

  const crearRuc = async () => {
    const data = {
      ruc: ruc,
      nombre: nombre,
      apellido: apellido,
      ruc_tipo: "natural",
      estado: "act",
    };

    await fetch("http://localhost:3000/clientes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
      <section id="modal" className="modal" style={styleModal}>
        <div className="modal-container">
          <form className="form-cliente" id="clientes" onSubmit={crearRuc}>
            <Label htmlFor="ruc" textContent="RUC:" />
            <Input
              id="ruc"
              name="ruc"
              type="text"
              placeholder="123456789"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
            />
            <SpanError id="rucError" className="error-message" />

            <Label htmlFor="nombreRuc" textContent="Nombre:" />
            <Input
              id="nombreRuc"
              name="nombreRuc"
              placeholder="****"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <SpanError id="nombreError" className="error-message" />

            <Label htmlFor="apellidoRuc" textContent="Apellido:" />
            <Input
              id="apellidoRuc"
              name="apellidoRuc"
              type="text"
              placeholder="****"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            <SpanError id="apellidoError" className="error-message" />

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
)}
