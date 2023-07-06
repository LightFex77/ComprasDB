const express = require("express");
const path = require("path");
const pg = require('pg');

const app = express();
const expressConfiguracionJson = express.json();

app.use(expressConfiguracionJson)

const connection = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    port: 5432,
    database: 'postgres'
});

app.get("/tipo-producto", async (req, res)=>{
    const tipoProductos = await connection.query(`
        SELECT * FROM tipo_producto;
    `)
    res.status(200).json({
        resultado: tipoProductos.rows
    })
})

app.post("/tipo-producto", async (req, res)=>{
    console.log({"reqbody": req.body})
    const nombre = req.body.nombre;
    const estado = req.body.estado;
    const fechaCreacion = new Date();
    const nuevoProducto = await connection.query(`
    INSERT INTO public.tipo_producto(texto, estado, fecha_creacion)
	VALUES ($1, $2, $3);
    `, [nombre, estado, fechaCreacion.toISOString()])
    res.status(200).json({
        resultado: nuevoProducto.rows
    })
})
//Conseguir la tabla compras

app.get("/compras", async (req, res)=>{
    const nuevaCompra = await connection.query(`
        SELECT * FROM compras;
    `)
    console.log(nuevaCompra.rows)
    res.status(200).json({
        resultado : nuevaCompra.rows
    })
})

//Metodo post tabla compras
app.post("/compras", async (req, res)=>{
    console.log({"reqbody": req.body})
    const {valor, fecha_vencimiento: fechaVencimiento, estado = "pen", tipo} = req.body;
    const fechaCreacion = new Date();
    const fechaVencimientoParseado = new Date(fechaVencimiento);
    console.log([valor, fechaCreacion, fechaVencimientoParseado, estado, tipo])

    const nuevaCompra = await connection.query(`
    INSERT INTO public.compras(
        valor, fecha_creacion, fecha_vencimiento, estado, tipo)
        VALUES ($1, $2, $3, $4, $5);
    `, [valor, fechaCreacion, fechaVencimientoParseado, estado, tipo])
    res.status(200).json({
        resultado: nuevaCompra.rows
    })
})

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/index.html"));
    // res.send("hello");
})

app.listen(3000, async () => {
    await connection.connect()
    console.log('database is running');
    console.log("server listening running", 3000);
})