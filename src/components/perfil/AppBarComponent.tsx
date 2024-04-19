import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Search from "@/components/perfil/Search";
import PaperCarrito from "@/components/producto/PaperCarrito";
import MenuPerfil from "./MenuPerfil";
import { useNavigate } from "react-router-dom";

const AppBarComponent = ({ userId, username }) => {
  const navigate = useNavigate();

  return (
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
        @{username}
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
  );
};

export default AppBarComponent;
