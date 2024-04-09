import { useContext } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./Header.css";
import perfilDefault from "@/assets/img/Perfil//png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import ToolsIcon from "@mui/icons-material/Build";
import CupStrawIcon from "@mui/icons-material/LocalCafe";
import BadgeIcon from "@mui/icons-material/Badge";
import AuthContext from "@/auth/AuthContext";

const navLinks = [
  {
    title: "Sobre Nosotros",
    path: "#sobre",
    icon: <PersonIcon />, // Use MUI icon
  },
  {
    title: "Servicios",
    path: "#servicios",
    icon: <ToolsIcon />, // Use MUI icon
  },
  {
    title: "Productos",
    path: "#productos",
    icon: <CupStrawIcon />, // Use MUI icon
  },
  {
    title: "Contacto",
    path: "#contacto",
    icon: <BadgeIcon />, // Use MUI icon
  },
];

const NavListDrawer = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const { authTokens, user, getImageSrc } = useContext(AuthContext);
  console.log(user?.imagen)

  return (
    <div>
      <Box sx={{ width: 250, bgcolor: "#9fde9f" }}>
        <nav className="nav-list">
          <List>
            <ListItem
              sx={{
                width: "100%",
                height: { xs: 55, md: 80 },
                mb: { xs: 0, md: 1 },
              }}
              disablePadding
            >
              <ListItemButton onClick={() => {navigate("/perfil")}}>
                <Box
                  component="img"
                  src={ authTokens && user?.imagen ? getImageSrc(user?.imagen) : perfilDefault}
                  alt=""
                  sx={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    overflow: "hidden",
                    width: { xs: 50, md: 80 },
                    height: { xs: 50, md: 80 },
                    ml: { xs: "150%", md: "30%" },
                  }}
                ></Box>
              </ListItemButton>
            </ListItem>
            <Divider />
            {navLinks.map((item, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton
                  className="drawer-link"
                  component="a"
                  href={item.path}
                  onClick={() => {
                    onLinkClick();
                  }}
                >
                  <ListItemIcon
                    sx={{ color: "black", fontSize: { xs: 14, md: 16 } }}
                  >
                    {item.icon === "home" ? <HomeIcon /> : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    style={{ color: "black", fontSize: { xs: 12, md: 16 } }}
                  >
                    {item.title}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </div>
  );
};

export default NavListDrawer;
