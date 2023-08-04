import { Button } from "../elementos/Button";
import { Input } from "../elementos/Input";
import "../../styles/modalCliente.css";
import { Select } from "../elementos/Select";
import logo from "../../svg/mugi-hub-logo-modal.png";
export const ModalPagar = ({style}) => {
  const dias = [
    {
      id: 1,
      texto: "1",
    },
    {
      id: 2,
      texto: "2",
    },
  ];
  return (
    <section className="modal" style={style}>
      <div className="modal-content">
        <img src={logo} width="40px" height="40px"/>
        <h1 className="h1Style">Pagar</h1>
        <hr className="hrStyle" />
        <Input labelText="Abono" placeholder="$123.000" />
        <Select options={dias} labelText="Dias" selectTipo="Seleciona la cantidad de dias"/>
        <div className="button-container">
        <Button textContent="Procesar" className="button-modal" />
        </div>
      </div>
    </section>
  );
};
