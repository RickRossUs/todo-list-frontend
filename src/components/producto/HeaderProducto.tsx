import { useContext } from "react";
import { AppBar, Box, Typography } from "@mui/material";
import "@/assets/css/Producto.css";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaperCarrito from "./PaperCarrito";
import SearchProductos from "./SearchProductos";
import AuthContext from "@/context/AuthContext";
import ProductosContext from "@/context/ProductosContext";
import { AuthContextValue } from "@/types/AuthContextValue";
import { ProductosContextValue } from "@/types/ProductosContextValue";

const HeaderProducto = () => {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext) as AuthContextValue;
  const { esFavorito } = useContext(ProductosContext) as ProductosContextValue;

  const handleFavorito = () => {
    if (!esFavorito) navigate("/productos/favorito");
    else navigate("/productos");
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          p: 2,
          bgcolor: "green",
          mb: 0,
          height: { xs: "7vh" },
        }}
      >
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, fontSize: "18px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIcon />
        </Typography>
        <Typography variant="h4" sx={{ flexGrow: 1, fontSize: "18px" }}>
          Productos
        </Typography>
        <SearchProductos />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: { xs: "15%", md: "7%" },
            height: { xs: "3vh" },
          }}
        >
          {authTokens ? (
            <>
              <FavoriteIcon
                sx={{
                  fontSize: { xs: "14px", md: "18px" },
                  cursor: "pointer",
                  color: esFavorito ? "red" : "white",
                }}
                onClick={() => handleFavorito()}
              />
              <PaperCarrito />
            </>
          ) : (
            ""
          )}
        </Box>
      </AppBar>
    </div>
  );
};

export default HeaderProducto;
