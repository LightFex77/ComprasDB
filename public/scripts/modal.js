const modal = document.getElementById("modal");
const botonGuardar = document.getElementById("guardarRuc");

document.getElementById('clientes').onsubmit = async function crearCliente(e) {
    modal.style.opacity = 0;
    modal.style.pointerEvents = "none";

    const form = new FormData(e.target);
    // const ruc = form.get('ruc');
    // const nombreRuc = form.get('nombreRuc');
    // const apellidoRuc = form.get('apellidoRuc');

    const data = {
        "ruc" : parseInt(form.get('ruc')),
        "nombre": form.get('nombreRuc'),
        "apellido": form.get('apellidoRuc')
    }

    const respuesta = await fetch("/clientes", {
        method: "POST",
        body : JSON.stringify(data),
        headers : {
            "Content-Type": "application/json"
        }
    })
    alert('nuevo cliente Creado')
}

// botonGuardar.addEventListener('click', (e)=>{
//     e.preventDefault()
//     modal.style.opacity = 0;
//     modal.style.pointerEvents = "none";
// })