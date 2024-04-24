import { useContext } from "react";
import { AxiosResponse } from "axios";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductosContext from "@/context/ProductosContext";
import {
  fetchPostFavorito,
  fetchDeleteFavorito,
} from "@/services/FavoritosService";
import { Es_Favorito } from "@/types/Es_Favorito";
import { ProductosContextValue } from "@/types/ProductosContextValue ";
import type { Favorito } from "@/types/Favorito";

const Favorito = ({ productoId, favorito }: {productoId:number, favorito:Es_Favorito}) => {
  const { toggleFavorito } = useContext(ProductosContext) as ProductosContextValue;

  const onFavProducto = async () => {
    try {
      const response: AxiosResponse<Favorito> = favorito.is
        ? await fetchDeleteFavorito(favorito.id)
        : await fetchPostFavorito(productoId);

      toggleFavorito(productoId, response.data.id, !favorito.is);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <Box
        onClick={() => {
          onFavProducto();
        }}
        sx={{
          position: "absolute",
          top: "5px",
          right: "10px",
          color: "white",
          fontSize: { xs: "13px", md: "16px" },
          "& .MuiSvgIcon-root": {
            fill: favorito.is ? "red" : "none",
            stroke: favorito.is ? "none" : "white",
            "&:hover": {
              fill: "white",
              stroke: "none",
            },
          },
        }}
      >
        <FavoriteIcon sx={{ fontSize: { xs: "14px", md: "18px" } }} />
      </Box>
    </div>
  );
};

export default Favorito;
