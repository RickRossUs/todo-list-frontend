import { useEffect, useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import "./Header.css";
import HomeIcon from "@mui/icons-material/Home"; // Import MUI icon
import MenuIcon from "@mui/icons-material/Menu"; // Import MUI icon
import { useNavigate } from "react-router-dom";
import AuthContext from "@/auth/AuthContext";

const navMenu = [
  { title: "Home", path: "", icon: <HomeIcon /> }, // Use MUI icon
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { authTokens, loginUser, logoutUser } = useContext(AuthContext);
  const [perfil, setPerfil] = useState([]);

  const handleNavegation = () => {
    if (authTokens) logoutUser();
    else navigate("/login");
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const URL = "http://127.0.0.1:8000/usuarios/";

        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        });
        const data = await response.json();

        setPerfil(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (authTokens) {
      fetchUsuario();
    } 
  }, [authTokens]);

  return (
    <div>
      <AppBar
        className="navBar"
        sx={{ bgcolor: "#1d801d", position: "sticky", top: 0 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit" onClick={() => setOpen(true)} sx={{}}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontSize: { xs: 16, md: 25 } }}
          >
            AgroMarketHub
          </Typography>

          <Box sx={{}}>
            {navMenu.map((item) => (
              <Button
                className="link"
                color="inherit"
                key={item.title}
                component="a"
                href={item.path}
                sx={{
                  fontFamily: "poppins",
                  position: "relative",
                  color: "white",
                  fontSize: { xs: 15 },
                }}
              >
                {item.icon}{" "}
              </Button>
            ))}
            <Button
              className="link"
              color="success"
              variant="contained"
              onClick={handleNavegation}
              sx={{
                fontFamily: "poppins",
                position: "relative",
                color: "white",
                fontSize: { xs: 10, md: 16 },
              }}
            >
              {authTokens ? "Salir" : "Acceder"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)} sx={{}}>
        <NavListDrawer perfil={perfil[0]} onLinkClick={() => setOpen(false)} />
      </Drawer>
    </div>
  );
};

export default Navbar;
