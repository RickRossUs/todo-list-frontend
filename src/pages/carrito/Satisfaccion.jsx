import { useEffect, useState, useContext } from "react";
import { Rating } from "@mui/material";
import AuthContext from "@/auth/AuthContext";

const Satisfaccion = ({ value, productoId }) => {
  const { authTokens } = useContext(AuthContext);
  const URL = "http://127.0.0.1:8000/productos/satisfacciones/";

  const getSatisfacciones = async () => {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    const data = await response.json();
    return data;
  };

  const agregarSatisfaccion = async (calificacion) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ producto: productoId, calificacion: calificacion }),
    });
  };

  const modificarSatisfaccion = async (id, calificacion) => {
    const response = await fetch(URL + id + "/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ calificacion: calificacion }),
    });
  };

  const eliminarSatisfaccion = async (id) => {
    const response = await fetch(URL + id + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
  };

  const handleSatisfaccion = async (event, newValue) => {
    if (newValue === 0) {
      const satisfacciones = await getSatisfacciones();
      const satisfaccionToDelete = satisfacciones.find(
        (item) => item.producto.id === productoId
      );
      if (satisfaccionToDelete) {
        await eliminarSatisfaccion(satisfaccionToDelete.id);
      }
    } else {
      const satisfacciones = await getSatisfacciones();
      const existe = satisfacciones.find(
        (item) => item.producto.id === productoId
      );
      if (existe) {
        await modificarSatisfaccion(existe.id, newValue);
      } else {
        await agregarSatisfaccion(newValue);
      }
    }
  };

  return (
    <div>
      <Rating
        name="half-rating"
        defaultValue={value}
        precision={1}
        size="small"
        sx={{ width: "fit-content" }}
        onChange={handleSatisfaccion}
      />
    </div>
  );
};

export default Satisfaccion;
