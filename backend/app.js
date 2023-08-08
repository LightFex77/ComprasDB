const express = require("express")
const app = express();
const path = require("path");
const pg = require('pg');
const cors = require('cors');
const tipoProductoRouter = require("./router/tipoProducto.router");
const clientesRouter = require("./router/clientes.router");
const comprasRouter = require("./router/compras.router");
const empleadosRouter = require("./router/empleados.router");
const consultarComprasRouter = require('./router/consultCompras.router');

const expressConfiguracionJson = express.json();
const corsConfiguracion = cors("http://localhost:5173")


app.use(corsConfiguracion)
app.use(expressConfiguracionJson)

//Conectar a la base de datos
const connection = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    port: 5432,
    database: 'postgres',
});

//Linea de codigo para utilizar los archivos estaticos (css, js) de public
app.use(express.static(path.join(__dirname, "public")));

//Conseguir el archivo raiz y enviarselo al cliente
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.listen(3000, async () => {
    await connection.connect()
    console.log('database is running');
    console.log("server listening running", 3000);
})

// Implementación del tipo producto
app.use(tipoProductoRouter);

// Implementación de compras
app.use(comprasRouter);

// Implementación de clientes
app.use(clientesRouter);

// Implementación de empleados
app.use(empleadosRouter);

// TODO: Mover router, controlador y servicio al modulo de compras
app.use(consultarComprasRouter);