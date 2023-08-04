export const validarValor = (valor) => {
  const val = parseInt(valor);
  return !isNaN(val) && val > 0;
};

export const validarFecha = (fechaVencimiento) => {
  const fechaActual = new Date().toLocaleDateString("en-CA");
  return fechaVencimiento > fechaActual;
};

export const validarTipo = (tipoProducto) => {
  return tipoProducto != "";
};

export const validarSearchRuc = (ruc) => {
  const val = parseInt(ruc);
  return !isNaN(val);
};
