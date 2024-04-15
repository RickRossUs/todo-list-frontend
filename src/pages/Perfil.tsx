import { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import "@/assets/css/Perfil.css";
import Galeria from "@/components/perfil/Galeria";
import MenuPerfil from "@/components/perfil/MenuPerfil";
import Search from "@/components/perfil/Search";
import AgregarProducto from "@/components/producto/AgregarProducto";
import Productos from "@/pages/Productos";
import PaperCarrito from "@/components/producto/PaperCarrito";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";
import { useNavigate, useParams } from "react-router-dom";
import perfilDefault from "@/assets/img/Perfil//png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductosContext from "@/context/ProductosContext";
import { getImageSrc } from "@/helpers/imageHelper";
import { fetchGetPerfil } from "@/services/UsuariosService";

const Perfil = () => {
  const { authTokens } = useContext(AuthContext);
  const { user } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [usuario, setUsuario] = useState([]);
  const { productos, setProductos } = useContext(ProductosContext);

  useEffect(() => {
    const getUsuario = async () => {
      const response = await fetchGetPerfil(userId)
      if (response) {
        setUsuario(JSON.parse(response));
        setProductos(JSON.parse(response).productos);
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
          <Search />
          <PaperCarrito />
          {userId === undefined ? (
            <MenuPerfil />
          ) : (
            <AccountCircleIcon
              onClick={() => {
                navigate("/perfil");
              }}
              sx={{ m: 2, cursor: "pointer" }}
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
          <Galeria />
        </div>
      ) : (
        <Productos />
      )}
    </div>
  );
};

export default Perfil;
