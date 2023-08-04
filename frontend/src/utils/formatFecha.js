export const formatFecha = (fecha) => {
    const fechaDate = new Date(fecha);
    const formattedDate = fechaDate.toLocaleDateString("en-CA");
    return formattedDate.replace(/\//g, "-");
  };
  