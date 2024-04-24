import { useContext, SyntheticEvent } from "react";
import { AxiosResponse } from 'axios';
import { Rating } from "@mui/material";
import AuthContext from "@/context/AuthContext";
import {
  fetchGetSatisfacciones,
  fetchPostSatisfaccion,
  fetchPatchSatisfaccion,
  fetchDeleteSatisfaccion,
} from "@/services/SatisfaccionesService";
import { AuthContextValue } from "@/types/AuthContextValue";
import type { Satisfaccion } from "@/types/Satisfaccion";

const Satisfaccion = ({ value, productoId }: { value: number, productoId: number }) => {
  const { authTokens } = useContext(AuthContext) as AuthContextValue;

  const handleSatisfaccion = async (_: SyntheticEvent<Element, Event>, newValue:number | null) => {
    if (authTokens) {
      try {
        const response: AxiosResponse<Array<Satisfaccion>> = await fetchGetSatisfacciones();
        const satisfaccionExistente = response.data.find(
          (item) => item.producto.id === productoId
        );

        if (newValue === 0 && satisfaccionExistente) {
          await fetchDeleteSatisfaccion(satisfaccionExistente.id);
        } else if (newValue !== 0 && !satisfaccionExistente) {
          await fetchPostSatisfaccion(productoId, newValue || 0);
        } else if (newValue !== 0 && satisfaccionExistente) {
          await fetchPatchSatisfaccion(satisfaccionExistente.id, newValue || 0);
        }
      } catch (error) {
        console.error("Error manejando la satisfacción:", error);
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
