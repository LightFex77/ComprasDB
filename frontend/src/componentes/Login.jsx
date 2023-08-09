import logo from "../svg/mugi-hub-2.png";
//Styles
import "../styles/login.css";
//Elements
import { Button } from "./elementos/Button";
import { Input } from "./elementos/Input";
//Functions
// import { verifyAccount } from '../utils/login';
import { useState } from "react";
//states
import { useHistory } from "react-router-dom";
// import { useRedirectToLogin } from "../hooks/useRedirectToLogin";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClick = async (e) => {
    const data = {
      email: email,
      password: password,
    };

    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultado = await respuesta.json();
      if (respuesta.ok) {
        localStorage.setItem("empleado", JSON.stringify(resultado));
        history.push("/compras");
      } else {
        alert(resultado.error);
      }
    } catch (error) {
      console.error("Error de usuario", error);
    }
  };

  // cuando se monte el compnente se debe validar que el empleado no exista en el localstorage, sino -> app

  return (
    <form className="login-body" onClick={handleClick}>
      <div className="login-container">
        <div className="logo-mugihub">
          <img src={logo} alt="" />
        </div>
        <div className="login-access">
          {" "}
          {/* FORM !!!*/}
          <h1>Login</h1>
          <hr />
          <Input
            clase="email-i"
            labelText="Email"
            placeholder="jhon.doe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            clase="password-i"
            labelText="Contraseña"
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="sign-button" textContent="Entrar" />
        </div>
      </div>
    </form>
  );
};
