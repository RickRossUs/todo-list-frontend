import { Box, Container, Typography } from "@mui/material";
import "./SobreNosotros.css";
import logo from "../../assets/img/Fondos/thumb-1920-1274685.jpg";

const SobreNosotros = () => {
  return (
    <div id="sobre">
      <Container
        sx={{
          mt: 10,
          mb: 5,
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "55%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 2,
              fontFamily: "poppins",
              color: "#287928",
              fontSize: { xs: 18, md: 30 },
            }}
          >
            Sobre Nosotros
          </Typography>

          <Typography
            component="p"
            sx={{
              textAlign: "center",
              mb: 2,
              fontFamily: "poppins",
              fontSize: { xs: 10, md: 16, lg: 14 },
            }}
          >
            En AgroMarketHub, nos dedicamos a facilitar la conexión entre los
            amantes de alimentos frescos y productos de calidad. Somos una
            plataforma pensada para ofrecerte una experiencia única en la compra
            de productos alimenticios directamente del origen, llevando la
            frescura de la granja a tu mesa. Nuestra misión es transformar la
            forma en la que accedes a alimentos agrícolas, promoviendo la
            sostenibilidad, la transparencia y la calidad en cada paso de la
            cadena de suministro. No solo te ofrecemos alimentos, sino también
            una experiencia de compra segura y satisfactoria. Te invitamos a
            expolrar nuestro mercado virtual y descubrir la frescura y
            autenticidad de los productos que cultivamos con pasión y respeto
            por la naturaleza.
          </Typography>

          <Typography
            component="div"
            sx={{
              fontFamily: "poppins",
              fontWeight: 700,
              bgcolor: "lightgreen",
              borderRadius: 5,
              outline: 2,
              fontSize: { xs: 10, md: 15, lg: 13 },
              p: { xs: 0, md: 1 },
            }}
          >
            Bienvenido a AgroMarketHub, donde la frescura y la calidad se
            encuentran en cada bocado!
          </Typography>
        </Box>

        <Box
          sx={{
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ml: 5,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Foto"
            sx={{
              width: "50%",
              height: "100%",
              borderRadius: 10,
              position: "absolute",
              right: "-10%",
              objectFit: "cover",
            }}
          ></Box>
        </Box>
      </Container>
    </div>
  );
};

export default SobreNosotros;
