// Clientes.js
import { Input } from "../componentes/elementos/Input";
import { Button } from "../componentes/elementos/Button";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import { useRedirectToLogin } from "../hooks/redirectLogin";
import { selectedCustomer } from "../utils/selectedCustomer";
export const Clientes = () => {
  // const history = useHistory();
  useRedirectToLogin();

  const [searchValue, setSearchValue] = useState('');
  const [infoClientes, setInfoClientes] = useState(null);
  const history = useHistory();

  // TODO: Cambiar nombre por el on buscar
  const onChangeCliente = async (e) => {
    e.preventDefault();

    try {
      let resultado = null;
      const endpoint = `cliente-compras?buscar=${searchValue}`;
      const response = await fetch(`http://localhost:3000/${endpoint}`);
      const data = await response.json();
      resultado = data.resultado;
    
      if (resultado) {
        // Si es un objeto, lo convertimos en un array antes de asignarlo a infoClientes
        const arrayResultado = Array.isArray(resultado) ? resultado : [resultado];
        
        if (arrayResultado.length > 0) {
          setInfoClientes(arrayResultado);
          return;
        }
      }
      
      console.log("No se encontraron resultados.");
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
    
  };

  return (
    <div className="container">
      <h1 className="h1Style">Buscar cliente</h1>
      <hr className="hrStyle" />
      <form className="search-client">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          mode="azul"
          textContent="Buscar RUC"
          onClick={onChangeCliente}
        />
      </form>
      <table>
        {infoClientes ? (
          <tbody>
            {infoClientes.map((item, index) => (
              <tr key={index} className="row-item" style={{cursor : "pointer"}} onClick={() => selectedCustomer(item.ruc, history)}>
                <td className="datos-de-compra">
                  Nombre: <span>{item.nombre}</span>{' '}
                  <span>{item.apellido}</span>
                </td>
                <td className="datos-de-compra">RUC: {item.ruc}</td>
                <td className="datos-de-compra">Compras pendientes: 3</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={3}>Cargando...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
