import { Box, Typography } from "@mui/material";
import "./Portada.css";

const Portada = () => {
  return (
    <div>
      <Box className="contenedor-portada" sx={{ height: "100vh" }}>
        <Box
          className="portada-titulo"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            className="titulo"
            component="h1"
            variant="h1"
            sx={{
              fontFamily: "vodan",
              color: "white",
              fontSize: { xs: 75, md: "12rem" },
            }}
          >
            AgroMarketHub
          </Typography>
          <Typography
            component="i"
            variant="h6"
            sx={{
              color: "white",
              fontFamily: "poppins",
              fontSize: { xs: 15, md: 25 },
            }}
          >
            Sus compras al alcance de un click.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Portada;
