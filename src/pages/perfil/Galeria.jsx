import { useContext, useState, useEffect } from "react";
import { Box, Card, Paper } from "@mui/material";
import "./Perfil.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/auth/AuthContext";

const Galeria = ({productos}) => {
  const navigate = useNavigate();
  const { authTokens, user, getImageSrc } = useContext(AuthContext);
  const [productosLocal, setProductosLocal] = useState(productos);

  const eliminarProducto = async (productId) => {
    const response = await fetch(
      "http://127.0.0.1:8000/productos/" + productId + "/",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    const productosActualizados = productosLocal?.filter(
      (producto) => producto.id !== productId
    );
    setProductosLocal(productosActualizados);
  };

  useEffect(() => {
      setProductosLocal(productos);
  }, [productos]);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          p: 1,
          display: "grid",
          gap: 1,
          bgcolor: "#fff",
          gridTemplateColumns: {
            xs: "repeat(3,1fr)",
            md: "repeat(6,1fr)",
            gap: 15,
          },
        }}
      >
        {productosLocal?.map((producto) => (
          <Paper
            sx={{
              position: "relative",
              height: { xs: "30vh", md: "40vh" },
              borderRadius: 5,
            }}
            key={producto.id}
          >
            <Box
              component="img"
              src={getImageSrc(producto.imagen)}
              alt={producto.nombre}
              sx={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                borderRadius: 5,
              }}
            />
            <Box
              className="tarjeta-overlay"
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                borderRadius: 5,
              }}
            >
              <Box
                className="item_overlay"
                sx={{
                  width: "100%",
                  height: "15%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // px: 5,
                  // py: 1,
                  bgcolor: "#b9b9b555",
                  backdropFilter: "blur(5px)",
                  position: "absolute",
                  bottom: "-6vh",
                  opacity: 0,
                  borderRadius: 5,
                }}
              >
                <Box
                  className="boton boton-editar"
                  color="white"
                  sx={{ p: 2, cursor: "pointer" }}
                  onClick={() => {
                    navigate("/crear-producto/" + producto.id + "/");
                  }}
                >
                  <EditIcon />
                </Box>
                <Box
                  className="boton boton-eliminar"
                  color="white"
                  sx={{ p: 2, cursor: "pointer" }}
                  onClick={() => {
                    eliminarProducto(producto.id);
                  }}
                >
                  <DeleteIcon />
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default Galeria;
