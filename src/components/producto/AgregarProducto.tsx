import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "@/assets/css/Perfil.css";
import { useNavigate } from "react-router-dom";

const AgregarProducto = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          className="boton-Agregar"
          variant="outlined"
          color="success"
          sx={{
            borderRadius: 5,
            alignSelf: "center",
            border: 2,
            borderStyle: "dashed",
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center", fontSize: 14 }}
            onClick={() => {
              navigate("/crear-producto");
            }}
          >
            Agregar Producto
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

export default AgregarProducto;
