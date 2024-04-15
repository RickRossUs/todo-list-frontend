import { useContext } from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthContext from "@/context/AuthContext";
import ProductosContext from "@/context/ProductosContext";
import {
  fetchPostFavorito,
  fetchDeleteFavorito,
} from "@/services/FavoritosService";

const Favorito = ({ productoId, favorito }) => {
  const { authTokens } = useContext(AuthContext);
  const { toggleFavorito } = useContext(ProductosContext);

  const onFavProducto = async () => {
    try {
      const response = favorito.is
        ? await fetchDeleteFavorito(favorito.id)
        : await fetchPostFavorito(productoId);

      toggleFavorito(productoId, JSON.parse(response)?.id, !favorito.is);
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
