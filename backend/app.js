const express = require("express")
const app = express();
const path = require("path");
const pg = require('pg');
const cors = require('cors');
const tipoProductoRouter = require("./router/tipoProducto.router");
const clientesRouter = require("./router/clientes.router")

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
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/index.html"));
    // res.send("hello");
})

//mensjae de prueba de conexion con exito
app.listen(3000, async () => {
    await connection.connect()
    console.log('database is running');
    console.log("server listening running", 3000);
})

//Implementar modulo tipo-producto
app.use(tipoProductoRouter);

const HORAS_DIFERENCIA_UTC = new Date().getTimezoneOffset() * 60000;

//Metodo post tabla compras
app.post("/compras", async (req, res)=>{
    console.log({"reqbody": req.body})
    const {valor, fecha_vencimiento: fechaVencimiento, estado = "pen", tipo, cliente_id} = req.body;
    const fechaCreacion = new Date();
    const fechaVencimientoParseado = new Date(new Date(fechaVencimiento).getTime() + HORAS_DIFERENCIA_UTC) 

    console.log([valor, fechaCreacion, fechaVencimientoParseado, estado, tipo, cliente_id])

    const nuevaCompra = await connection.query(`
    INSERT INTO public.compras(
        valor, fecha_creacion, fecha_vencimiento, estado, tipo, cliente_id)
        VALUES ($1, $2, $3, $4, $5, $6);
    `, [valor, fechaCreacion, fechaVencimientoParseado, estado, tipo, cliente_id])
    res.status(200).json({
        resultado: nuevaCompra.rows
    })
})

//Conseguimos la tabla clientes de la base de datos
app.use(clientesRouter)