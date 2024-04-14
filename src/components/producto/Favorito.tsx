import { useContext } from "react";
import {
  Box
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthContext from "@/context/AuthContext";
import ProductosContext from "@/context/ProductosContext";

const Favorito = ({productoId, favorito}) => {
  const { authTokens } = useContext(AuthContext);
  const { productos, setProductos } = useContext(ProductosContext);

  const onFavProducto = async () => {
    let action = "POST";
    let URL = import.meta.env.VITE_APP_API_URL + "/productos/favoritos/";

    if (favorito.is) {
      URL += favorito.id + "/";
      action = "DELETE";
    }

    try {
      const response = await fetch(URL, {
        method: action,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify({ producto: productoId }),
      });
      
      if (response.ok) {
        let data
        if (action === "POST") {
          data = await response.json();
        }
        const updatedProductos = productos.map((producto) => {
          if (producto.id === productoId) {
            return { ...producto, es_favorito: { is: action === "POST" ? true : false, id: action === "POST" ? data.id : null } };
          }
          return producto;
        });
        setProductos(updatedProductos);
      }
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
