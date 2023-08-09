import { Input } from "../elementos/Input"
import { Button } from "../elementos/Button"
import logo from "../../svg/mugi-hub-logo-modal.png"

export const ModalLiquidar = ({style, setShowLiquidar}) => {
  return (
    <section className="modal" style={style}>
    <div className="modal-content">
    <div className="exit-button-container">
        <Button textContent="X" className="exit-button" mode="azul" onClick={() => setShowLiquidar(false)}/>
        </div>
    <img src={logo} width="40px" height="40px"/>
        <h1 className="h1Style">Liquidar</h1>
        <hr className="hrStyle" />
          <Input labelText="Valor de liquidacion" clase="input-modal" placeholder="$123.000"/>
          <div className="button-container">
          <Button textContent="Procesar" className="button-modal"/>
          </div>
    </div>
  </section>
  )
}
