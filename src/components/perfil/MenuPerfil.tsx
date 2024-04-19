import { useState, useContext } from "react";
import { Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "@/assets/css/Perfil.css";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";
import ProductosContext from '@/context/ProductosContext';
import { useNavigate } from "react-router-dom";

const MenuPerfil = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logoutUsuario } = useContext(AuthContext);
  const { deleteUser } = useContext(UsuarioContext);
  const { setEsFavorito } = useContext(ProductosContext);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const response = await deleteUser()
    if (response) {
      logoutUsuario()
    }
  }

  return (
    <div>
      <Box sx={{ position: "relative" }}>
        <Button
          onClick={handleMenu}
          sx={{ color: "white", width: "5px"}}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <MenuItem className="menuItem item-fav" onClick={() => {navigate("/productos/favoritos")}}>
            <Box component="i" mr={2}></Box> Favoritos
          </MenuItem>
          <Divider />
          <MenuItem className="menuItem item-edit" onClick={() => {navigate('/detalles-perfil')}}>
            <Box component="i" mr={2}></Box> Editar Perfil
          </MenuItem>
          <Divider />
          <MenuItem className="menuItem item-cerrar" onClick={() => {logoutUsuario()}}>
            <Box component="i" mr={2}></Box>{" "}
            Cerrar Sesión
          </MenuItem>
          <Divider />
          <MenuItem className="menuItem item-del" onClick={() => {handleDelete()}}>
            <Box component="i" mr={2}></Box> Eliminar
            Perfil
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default MenuPerfil;
