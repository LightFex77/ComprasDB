import { Button } from "../elementos/Button";
import { Input } from "../elementos/Input";
import "../../styles/modalCliente.css";
import { Select } from "../elementos/Select";
import logo from "../../svg/mugi-hub-logo-modal.png";
import { useState } from "react";
import { diasSelectOptions } from "../../utils/diasSelectOptions";

export const ModalPagar = ({ style, dataClient, setShowPagar }) => {
  const [valor, setValor] = useState("");
  const [diasSelect, setDiasSelect] = useState("");

  const onClickPagar = async () => {
    const { compra_id, empleado_id } = dataClient.resultado[0];
    try {
      const data = {
        valor: parseInt(valor),
        compra_id: compra_id,
        empleado_id: empleado_id,
        dias: parseInt(diasSelect),
      };
      await fetch("http://localhost:3000/compras/abono", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert('¡Pago completado con exito!');
      setShowPagar(false);

      window.location.reload();
    } catch (error) {
      console.error("Error al pagar", error);
    }
  };
  return (
    <section className="modal" style={style}>
      <div className="modal-content">
        <div className="exit-button-container">
          <Button textContent="X" className="exit-button" mode="azul" onClick={() => setShowPagar(false)}/>
        </div>
        <img src={logo} width="40px" height="40px" />
        <h1 className="h1Style">Pagar</h1>
        <hr className="hrStyle" />
        <Input
          labelText="Abono"
          placeholder="$123.000"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <Select
          options={diasSelectOptions()}
          labelText="Dias"
          selectTipo="Seleciona la cantidad de dias"
          onChange={(e) => setDiasSelect(e.target.value)}
        />
        <div className="button-container">
          <Button
            textContent="Procesar"
            className="button-modal"
            onClick={onClickPagar}
          />
        </div>
      </div>
    </section>
  );
};
