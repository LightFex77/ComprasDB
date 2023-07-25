const express = require("express")
const app = express();
const path = require("path");
const pg = require('pg');
const cors = require('cors');

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

//Hacer la consulta al servidor y conseguir la tabla tipo-producto
app.get("/tipo-producto", async (req, res)=>{
    const tipoProductos = await connection.query(`
        SELECT * FROM tipo_producto;
    `)
    res.status(200).json({
        resultado: tipoProductos.rows
    })
})

//Hacer la consulta al servidor e insertar elementos en la tabla tipo-producto
app.post("/tipo-producto", async (req, res)=>{
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
app.get("/clientes", async(req, res)=>{
    const ruc = req.query.ruc;

    console.log("el ruc ->",ruc);

    if (!ruc) {
        return res.status(400).json({
            error: "Falta el ruc"
        })
    }

    const clientes = await connection.query(`
        SELECT * FROM clientes
        WHERE ruc = $1
    `,[ruc]);
    res.status(200).json({
        resultado: clientes.rows[0]
    })
})

app.post("/clientes", async(req, res)=>{
    const {ruc, ruc_tipo = "natural", nombre, apellido, estado = "act"} = req.body;
    const nuevoCliente = await connection.query(`
    INSERT INTO public.clientes(
        ruc, ruc_tipo, nombre, apellido, estado)
        VALUES ($1, $2, $3, $4, $5);
    `, [ruc, ruc_tipo, nombre, apellido, estado])
    res.status(200).json({
        resultado: nuevoCliente.rows
    })
})