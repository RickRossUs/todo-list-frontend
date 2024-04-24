import { useEffect, useState } from "react";
import { AxiosResponse } from 'axios';
import { Box, Typography } from "@mui/material";
import "@/assets/css/Producto.css";
import { useNavigate } from "react-router-dom";
import { fetchGetProductos } from "@/services/ProductosService";
import { Producto } from "@/types/Producto";
import { OffsetResponse } from "@/types/OffsetResponse";

const ProductosMasVendidos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Array<Producto>>([]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response: AxiosResponse<OffsetResponse> = await fetchGetProductos("", 0, 0, 5, 0)

        setProductos(response.data.results);
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
              {productos?.map((producto) => (
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
                    onClick={() => {
                      navigate("/productos");
                    }}
                  >
                    Más detalles
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              onClick={() => {
                navigate("/productos");
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

export default ProductosMasVendidos;
