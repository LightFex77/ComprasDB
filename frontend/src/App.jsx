import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Main } from "./componentes/Main";
import { Menu } from "./componentes/Menu";
import { Login } from "./componentes/login";
import { ComprasHoy } from "./componentes/comprasHoy";
import { Clientes } from "./componentes/Clientes";
import { ResultClient } from "./componentes/ResultClient";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/compras">
          <Menu />
          <Main />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/compras/compras-de-hoy">
          <Menu />
          <ComprasHoy />
        </Route>
        <Route exact path="/registro-de-clientes">
          <Menu />
          <Clientes />
        </Route>
        <Route exact path="/registro-de-clientes/:ruc">
          <Menu />
          <ResultClient />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
