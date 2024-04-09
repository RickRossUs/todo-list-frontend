import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import "./Servicios.css";

const tarjetas = [
  {
    id: 1,
    icon: <i className="bi bi-flower3"></i>,
    name: "Compra Diercta",
    desc: "Promovemos la compra de productos naturales y de calidad.",
  },
  {
    id: 2,
    icon: <i className="bi bi-ev-front"></i>,
    name: "Envíos Rápidos",
    desc: "Garantizamos los envíos rápidos y seguros, los pedidos llegarán en óptimaas condiciones y en el menor tiempo posible.",
  },
  {
    id: 3,
    icon: <i className="bi bi-basket"></i>,
    name: "Variedad de Productos",
    desc: "Amplia variedad de productos frescos disponibles, desde frutas y verduras hasta productos lácteos, carnes y procesados.",
  },
  {
    id: 4,
    icon: <i className="bi bi-pin-map"></i>,
    name: "Productores Locales",
    desc: "Facilitamos la conexión directa con los productores locales, comprando en nuestra plataforma estarás apoyando la economía regional.",
  },
];

const Servicios = () => {
  return (
    <div>
      <Box sx={{ py: 1 }}>
        <Container
          id="servicios"
          sx={{ mb: 5, width: "100%", mt: { xs: 2, md: 10 } }}
        >
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
            Nuestros Servicios
          </Typography>
          <Box
            className="flex"
            sx={{ display: { md: "flex" }, height: { xs: "30vh", md: "60vh" } }}
          >
            {tarjetas.map((item) => (
              <Paper
              key={item.id}
                className="item"
                elevation={3}
                sx={{
                  bgcolor: "white",
                  width: "24%",
                  height: { xs: "80%", md: "60%" },
                  p: 1,
                  gap: 1,
                  border: 2,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Box
                  component="i"
                  sx={{
                    position: "absolute",
                    top: "-12%",
                    left: { xs: "40%", md: "45%" },
                    fontSize: { xs: 20, md: 40 },
                    bgcolor: "white",
                    color: "green",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  className="servicios_nombre"
                  variant="h6"
                  sx={{ color: "mint", fontSize: { xs: 12, md: 20 } }}
                >
                  {item.name}
                </Typography>
                <Typography
                  className="servicios_info"
                  variant="p"
                  sx={{ fontSize: { xs: 8, md: 20 } }}
                >
                  {item.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Servicios;
