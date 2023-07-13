const ruc = document.getElementById("ruc");
const nombreRuc = document.getElementById("nombreRuc");
const apellidoRuc = document.getElementById("apellidoRuc");

const rucError = document.getElementById("rucError");
const nombreError = document.getElementById("nombreError");
const apellidoError = document.getElementById("apellidoError");

const modal = document.getElementById("modal");
const botonGuardar = document.getElementById("guardarRuc");
const botonCancel = document.getElementById("rucCancel");

document.getElementById("clientes").onsubmit = async function crearCliente(e) {
  e.preventDefault();

  const rucValue = ruc.value.trim();
  const nombreValue = nombreRuc.value.trim();
  const apellidoValue = apellidoRuc.value.trim();

  let isValid = true; // Variable para rastrear si se cumplen todas las condiciones

  // Validación del campo RUC
  if (rucValue === "" || isNaN(rucValue)) {
    rucError.textContent = "Por favor, ingresa un RUC válido";
    rucError.style.display = "block";
    isValid = false;
  } else {
    rucError.style.display = "none";
  }

  // Validación del campo Nombre
  if (nombreValue === "" || !isNaN(nombreValue)) {
    nombreError.textContent = "Por favor, ingresa un nombre válido";
    nombreError.style.display = "block";
    isValid = false;
  } else {
    nombreError.style.display = "none";
  }

  // Validación del campo Apellido
  if (apellidoValue === "" || !isNaN(apellidoValue)) {
    apellidoError.textContent = "Por favor, ingresa un apellido válido";
    apellidoError.style.display = "block";
    isValid = false;
  } else {
    apellidoError.style.display = "none";
  }

  if (isValid) {
    const data = {
      ruc: parseInt(rucValue),
      nombre: nombreValue,
      apellido: apellidoValue
    };

    const respuesta = await fetch("/clientes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    modal.style.opacity = 0;
    modal.style.pointerEvents = "none";
    alert("Nuevo cliente creado");
    
    // Actualizar la página
    location.reload();
  }
};

botonCancel.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.opacity = 0;
  modal.style.pointerEvents = "none";
});
