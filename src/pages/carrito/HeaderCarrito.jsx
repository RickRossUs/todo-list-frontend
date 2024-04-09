import { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Badge,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemButton,
  Divider,
  Button,
} from "@mui/material";
import "./Carrito.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaperCarrito from "./PaperCarrito"

const HeaderCarrito = ({ allProducts, setAllProducts }) => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          p: 2,
          bgcolor: "green",
          mb: 0,
          height: { xs: "7vh" },
        }}
      >
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, fontSize: "18px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIcon />
        </Typography>
        <Typography variant="h4" sx={{ flexGrow: 1, fontSize: "18px" }}>
          Productos
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: { xs: "15%", md: "7%" },
            height: { xs: "3vh" },
          }}
        >
          <Box>
            <FavoriteIcon sx={{ fontSize: { xs: "14px", md: "18px" } }} />
          </Box>
      <PaperCarrito />
          
        </Box>
      </AppBar>

    </div>
  );
};

export default HeaderCarrito;
