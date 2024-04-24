import { useContext } from "react";
import { Box, Paper } from "@mui/material";
import "@/assets/css/Perfil.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ProductosContext from "@/context/ProductosContext";
import { getImageSrc } from "@/helpers/imageHelper";
import { ProductosContextValue } from "@/types/ProductosContextValue ";

const Galeria = () => {
  const navigate = useNavigate();
  const { productos, eliminarProducto } = useContext(ProductosContext) as ProductosContextValue;

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
        {productos?.map((producto) => (
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
