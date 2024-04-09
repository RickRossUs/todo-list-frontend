import { useState, useContext } from "react";
import { Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Perfil.css";
import AuthContext from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const MenuPerfil = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logoutUser, deleteUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

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
          <MenuItem className="menuItem item-fav" onClick={closeMenu}>
            <Box component="i" mr={2}></Box> Favoritos
          </MenuItem>
          <Divider />
          <MenuItem className="menuItem item-edit" onClick={() => {navigate('/detalles-perfil')}}>
            <Box component="i" mr={2}></Box> Editar Perfil
          </MenuItem>
          <Divider />
          <MenuItem className="menuItem item-cerrar" onClick={() => {logoutUser()}}>
            <Box component="i" mr={2}></Box>{" "}
            Cerrar Sesión
          </MenuItem>
          <Divider />
          <MenuItem className="menuItem item-del" onClick={() => {deleteUser()}}>
            <Box component="i" mr={2}></Box> Eliminar
            Perfil
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default MenuPerfil;
