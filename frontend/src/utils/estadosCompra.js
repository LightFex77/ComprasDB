export const estadosCompra = (estado) => {
    switch (estado) {
      case "pen":
        return "PENDIENTE";
      case "act":
        return "ACTIVO";
      case "ven":
        return "VENCIDO";
      case "pgd":
        return "PAGADO";
      default:
        return "Desconocido";
    }
  };