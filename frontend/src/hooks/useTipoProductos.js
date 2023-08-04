import { useEffect, useState } from "react";

export const useTipoProductos = () => {
  const [listaDeTipos, setListaDeTipos] = useState([]);

  // use effect para cargar las listas de tipo producto
  useEffect(() => {
    async function getTipoProductos() {
      try {
        //buscar la base de datos y obtenerla GET
        const backendUrl = "http://localhost:3000";
        const respuestaBd = await fetch(backendUrl + "/tipo-producto", {
          method: "GET",
        });

        //Obtener los datos en JSON
        const bdJson = await respuestaBd.json();
        const resultado = bdJson.resultado;

        setListaDeTipos(resultado);
      } catch (error) {
        console.log({ error });
      }
    }

    //Hacer que la funcion se ejecute cada vez que se inicia la pagina
    getTipoProductos();
  }, []);

  return listaDeTipos;
};
