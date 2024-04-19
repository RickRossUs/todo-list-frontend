import { useState, useContext, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import "@/assets/css/Perfil.css";
import Galeria from "@/components/perfil/Galeria";
import AgregarProducto from "@/components/producto/AgregarProducto";
import Productos from "@/pages/Productos";
import UsuarioContext from "@/context/UsuarioContext";
import { useNavigate, useParams } from "react-router-dom";
import perfilDefault from "@/assets/img/Perfil/png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductosContext from "@/context/ProductosContext";
import { getImageSrc } from "@/helpers/imageHelper";
import { fetchGetPerfil } from "@/services/UsuariosService";
import AppBarComponent from "@/components/perfil/AppBarComponent";

const Perfil = () => {
  const { user } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [usuario, setUsuario] = useState([]);
  const { productos, setProductos } = useContext(ProductosContext);

  useEffect(() => {
    const getUsuario = async () => {
      const response = await fetchGetPerfil(userId);
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
      <AppBarComponent userId={userId} username={usuario?.username} />
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
