import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Chip,
  Tabs,
  Paper,
  Typography,
} from "@mui/material";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";
import Satisfaccion from "./Satisfaccion";
import Favorito from "./Favorito";
import CarritoContext from "@/context/CarritoContext";
import ProductosContext from "@/context/ProductosContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getImageSrc } from '@/helpers/imageHelper';

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CardCarrito = ({producto}) => {
  const { authTokens } = useContext(AuthContext);
  const { user } = useContext(UsuarioContext);
  const { buyCarrito } = useContext(CarritoContext);
  const { filterProductosByCategoria } = useContext(ProductosContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Paper
        className="item"
        key={producto.id}
        elevation={2}
        sx={{
          width: { xs: "200px", md: "300px" },
          height: { xs: "300px", md: "400px" },
          bgcolor: "#88d488aa",
          borderRadius: 5,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Box
          className="item__img"
          sx={{
            height: { xs: "130px", md: "180px" },
            bgcolor: "green",
            position: "relative",
            borderRadius: 5,
            oerflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={getImageSrc(producto.imagen)}
            alt={producto.name}
            sx={{
              width: "100%",
              borderRadius: 5,
              position: "relative",
              bgcolor: "red",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {authTokens ? (
            user.id !== producto.usuario.id ? (
              <Favorito productoId={producto.id} favorito={producto.es_favorito} />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "10px",
                  fontSize: { xs: "13px", md: "16px" },
                }}
              >
                <AccountCircleIcon
                  sx={{
                    fontSize: { xs: "14px", md: "18px" },
                    color: "#FFD700",
                  }}
                />
              </Box>
            )
          ) : (
            ""
          )}
          {user?.id !== producto.usuario.id && !location.pathname.includes('/perfil') ? (
            <Box
              sx={{
                position: "absolute",
                top: 3,
                left: "37%",
                bgcolor: "lightgreen",
                p: "4px",
                borderRadius: 5,
                fontSize: { xs: 10, md: 12 },
              }}
              onClick={() => {
                navigate("/perfil/" + producto.usuario.id + "/");
              }}
            >
              {producto.usuario.username}
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: 3,
              right: "8px",
              bgcolor: "lightgreen",
              borderRadius: "20px",
              p: "0 4px",
              fontSize: { xs: 10, md: 12 },
            }}
          >
            {"$ " + producto.precio}
          </Box>
        </Box>
        <Box
          className="item__info"
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            height: { xs: "180px", md: "220px" },
            justifyContent: "space-around",
            position: "relative",
            backdropFilter: "blur(50px)",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: "16px" } }}>
            {producto.nombre}
          </Typography>
          <Typography variant="p" sx={{ fontSize: { xs: "12px" } }}>
            {producto.descripcion}
          </Typography>
          <Satisfaccion
            value={producto.promedio_satisfaccion}
            productoId={producto.id}
          />
          <Chip
            label={producto.categoria.nombre}
            variant="outlined"
            color="success"
            sx={{
              fontFamily: "poppins",
              width: "fit-content",
              fontSize: { xs: "10px" },
            }}
            onClick={(e) => filterProductosByCategoria(producto.categoria.id)}
          ></Chip>
          {authTokens && user.id !== producto.usuario.id ? (
            <Button
              className="btn-cart"
              onClick={() => buyCarrito(producto.id)}
              sx={{
                bgcolor: "black",
                color: "white",
                borderBottomRightRadius: { xs: "12px", md: "10px" },
                borderBottomLeftRadius: { xs: "12px", md: "10px" },
                fontSize: { xs: "10px" },
              }}
            >
              <ShoppingCartIcon />
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default CardCarrito;
