import React from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import angelinaImg from "../../assets/img/Perfil/angelina.jpg";
import johnImg from "../../assets/img/Perfil/john.jpg";
import vanessaImg from "../../assets/img/Perfil/vanessa.jpg";

const testimonios = [
  {
    id: 1,
    img: angelinaImg,
    nombre: "@angelina_93_S",
    texto:
      "Genial sitio, las mejores ofertas y la mejor calidad. Todo garantizado, mensajería 100% fiel y en un buen plazo de tiempo. Sinceramente perfecto!",
  },
  {
    id: 2,
    img: johnImg,
    nombre: "@johnM_95",
    texto:
      "Genial sitio, las mejores ofertas y la mejor calidad. Todo garantizado, mensajería 100% fiel y en un buen plazo de tiempo. Sinceramente perfecto!",
    bg: "green",
  },
  {
    id: 3,
    img: vanessaImg,
    nombre: "@vanessaJ21",
    texto:
      "Genial sitio, las mejores ofertas y la mejor calidad. Todo garantizado, mensajería 100% fiel y en un buen plazo de tiempo. Sinceramente perfecto!",
  },
];

const Testimonios = () => {
  return (
    <div>
      <Box
        sx={{
          bgcolor: "#89c389",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
          mb: 10,
        }}
      >
        <Container sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 20 }}>
            Nuestros clientes opinan
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {testimonios.map((item) => (
              <Card
                key={item.id}
                sx={{
                  width: "30%",
                  height: "40vh",
                  position: "relative",
                  overflow: "visible",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt="img"
                  sx={{
                    position: "absolute",
                    width: "40%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: "50%",
                    top: "-25%",
                    left: "28%",
                    outline: 5,
                    outlineColor: "lightgreen",
                    boxShadow: "5px 5px 10px",
                  }}
                ></Box>
                <Box
                  sx={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    mt: "15%",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {item.nombre}
                  </Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    {item.texto}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Testimonios;
