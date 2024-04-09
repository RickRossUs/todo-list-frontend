import { useEffect, useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./Producto.css";
import { useNavigate } from "react-router-dom";

const Productos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const URL = "http://127.0.0.1:8000/productos/";

        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        setProductos(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUsuario();
  }, []);
  return (
    <div>
      <Box id="productos" sx={{ mt: { xs: 0, md: 5 }, mb: { xs: 3, md: 5 } }}>
        <Box sx={{}}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              textAlign: "center",
              fontFamily: "poppins",
              color: "#287928",
              fontSize: { xs: 18, md: 30 },
            }}
          >
            Productos más populares
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              p: 0,
              height: { xs: "40vh", md: "80vh" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                ml: 2,
                height: { xs: "50%" },
              }}
            >
              {productos.map((producto) => (
                <Box
                  className="tarjeta"
                  key={producto.id}
                  sx={{
                    width: "20%",
                    height: "80%",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    backgroundImage: `url(${producto.imagen})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Typography variant="h5">{producto.nombre}</Typography>
                  <Box
                    component="a"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      textDecoration: "none",
                      color: "black",
                      backdrop: "blur(5px)",
                      p: 1,
                      opacity: 0,
                      transition: ".3s",
                      bgcolor: "lightgreen",
                      borderRadius: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => {navigate('/carrito')}}
                  >
                    Más detalles
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              onClick={() => {
                navigate("/carrito");
              }}
              sx={{
                bgcolor: "lightgreen",
                width: "fit-content",
                px: 1,
                textAlign: "center",
                borderRadius: 3,
                outline: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { xs: "10%" },
                cursor: "pointer",
              }}
            >
              <Typography
                component="a"
                variant="a"
                sx={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: { xs: 10, md: 14 },
                }}
              >
                Ver Categorías
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Productos;
