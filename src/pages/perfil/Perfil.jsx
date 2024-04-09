import { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import "./Perfil.css";
import Galeria from "./Galeria";
import circular from "@/assets/img/Perfil/IMG_20231204_072236_447.jpg";
import AgregarProducto from "./AgregarProducto";
import MenuPerfil from "./MenuPerfil";
import Search from "./Search";
import AuthContext from "@/auth/AuthContext";
import Carrito from "../carrito/Carrito";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import perfilDefault from "@/assets/img/Perfil//png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png";
import { CarritoProvider } from "@/context/CarritoContext";
import PaperCarrito from "../carrito/PaperCarrito";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Perfil = () => {
  const { authTokens, user, getImageSrc } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [usuario, setUsuario] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getUsuario = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/usuarios/" + userId + "/",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      const data = await response.json();
      if (data) {
        setUsuario(data);
        setProductos(data?.productos);
      }
    };
    if (userId) {
      getUsuario();
    } else {
      setUsuario(user);
      setProductos(user?.productos);
    }
  }, [user, userId]);

  return (
    <div>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          pl: 2,
          bgcolor: "rgba(104, 238, 144, 0.5)",
          boxShadow: 0,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography sx={{ flexGrow: 1, fontFamily: "poppins" }}>
          <ArrowBackIcon
            onClick={() => {
              navigate("/");
            }}
            cursor="pointer"
          />
        </Typography>
        <Typography sx={{ flexGrow: 1, fontFamily: "poppins" }}>
          @{usuario?.username}
        </Typography>
        <Toolbar>
          {/* <TextField
            type="search"
            size="small"
            margin="none"
            color="info"
            sx={{ borderColor: "white" }}
          /> */}
          <Search />
          <PaperCarrito />
          {userId === undefined ? (
            <MenuPerfil />
          ) : (
            <AccountCircleIcon
              onClick={() => {
                navigate("/perfil");
              }}
              sx={{ m:2, cursor: 'pointer' }}
            />
          )}
        </Toolbar>
      </AppBar>
      <Box
        className="portada-perfil"
        sx={{
          bgcolor: "red",
          width: "100%",
          height: "50vh",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={usuario?.imagen ? getImageSrc(usuario?.imagen) : perfilDefault}
          sx={{
            width: "20%",
            aspectRatio: "1/1",
            borderRadius: "50%",
            position: "absolute",
            outline: 5,
            outlineColor: "white",
            bottom: { xs: "-20%", md: "-40%" },
            left: "40%",
          }}
        ></Box>
      </Box>
      <Box
        className="relleno-perfil"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "center",
          gap: 2,
          mb: 5,
          height: { xs: "25vh", md: "45vh" },
        }}
      >
        <Typography
          color="white"
          component="h4"
          variant="h5"
          sx={{ alignItems: "center", color: "black", fontFamily: "poppins" }}
        >
          {usuario?.first_name + " " + usuario?.last_name}
        </Typography>
        <Typography
          color="white"
          component="h4"
          variant="p"
          sx={{
            alignItems: "center",
            color: "grey",
            fontFamily: "poppins",
            mb: 2,
          }}
        >
          {usuario?.direccion?.provincia && usuario?.direccion?.provincia + " "}
          {usuario?.direccion?.municipio && usuario?.direccion?.municipio + " "}
          {usuario?.direccion?.calle && usuario?.direccion?.calle + " "}
          {usuario?.direccion?.casa && usuario?.direccion?.casa}
        </Typography>
      </Box>

      {userId === undefined ? (
        <div>
          <AgregarProducto />
          <Galeria productos={productos} />
        </div>
      ) : (
        <Carrito products={productos} setProducts={setProductos} />
      )}
    </div>
  );
};

export default Perfil;
