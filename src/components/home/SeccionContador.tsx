import { Box, Typography } from "@mui/material";
import "./SeccionContador.css";

const SeccionContador = () => {
  return (
    <div>
      <Box
        className="contadores"
        sx={{
          height: { xs: "20vh", md: "30vh" },
          color: "white",
          mb: 0,
          p: { xs: 5, md: 0 },
        }}
      >
        <Box
          component="div"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            className="contador"
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.5em", md: "2.5em" } }}
            >
              <Typography
                component="span"
                variant="h4"
                data-count="156"
                sx={{ fontSize: { md: "1.5em" } }}
              >
                500
              </Typography>
              +
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1em", md: "1.5em" } }}
            >
              Clientes satisfechos
            </Typography>
          </Box>
          <Box
            className="contador"
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.5em", md: "2.5em" } }}
            >
              <Typography
                component="span"
                variant="h4"
                data-count="1000"
                sx={{ fontSize: "1.5em" }}
              >
                10 000
              </Typography>
              +
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1em", md: "1.5em" } }}
            >
              Ventas realizadas
            </Typography>
          </Box>
          <Box
            className="contador"
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.5em", md: "2.5em" } }}
            >
              <Typography
                component="span"
                variant="h4"
                data-count="91"
                sx={{ fontSize: "1.5em" }}
              >
                10
              </Typography>
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1em", md: "1.5em" } }}
            >
              Categorías de productos
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SeccionContador;
