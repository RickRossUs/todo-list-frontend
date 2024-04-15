import { useEffect, useState, useContext } from "react";
import { Rating } from "@mui/material";
import AuthContext from "@/context/AuthContext";
import {
  fetchGetSatisfacciones,
  fetchPostSatisfaccion,
  fetchPatchSatisfaccion,
  fetchDeleteSatisfaccion,
} from "@/services/SatisfaccionesService";

const Satisfaccion = ({ value, productoId }) => {
  const handleSatisfaccion = async (event, newValue) => {
    try {
      const satisfacciones = await fetchGetSatisfacciones();
      const satisfaccionExistente = satisfacciones.find(
        (item) => item.producto.id === productoId
      );

      if (newValue === 0 && satisfaccionExistente) {
        await fetchDeleteSatisfaccion(satisfaccionExistente.id);
      } else if (newValue !== 0 && !satisfaccionExistente) {
        await fetchPostSatisfaccion(productoId, newValue);
      } else if (newValue !== 0 && satisfaccionExistente) {
        await fetchPatchSatisfaccion(satisfaccionExistente.id, newValue);
      }
    } catch (error) {
      console.error("Error manejando la satisfacción:", error);
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
