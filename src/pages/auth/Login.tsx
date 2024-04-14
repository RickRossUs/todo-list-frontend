import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Stack,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";
import "./Login.css";

const Login = () => {
  const [values, setValues] = useState({
    user: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "Usuario",
      type: "text",
      placeholder: "Usuario",
      errorMessage:
        "El nombre de usuario debe ser único, debe contener entre 3 y 16 caracteres y no usar símbolos especiales.",
      required: true,
    },
    {
      id: 2,
      name: "Contraseña",
      type: "password",
      placeholder: "Contraseña",
      errorMessage: "La contraseña debe contener letras, números y símbolos.",
      required: true,
    },
  ];

  const navigate = useNavigate();
  const { loginUsuario } = useContext(AuthContext);
  const { getPerfil } = useContext(UsuarioContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const token = await loginUsuario({
      username: values.Usuario,
      password: values.Contraseña,
    });

    if (token) {
      getPerfil();
      navigate("/");
    } else {
      console.error("Error al autenticar al usuario");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Paper
          className="login"
          sx={{
            height: "80vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            mt: "10vh",
            p: 0,
            borderRadius: 5,
            position: { xs: "relative", md: "static" },
            zIndex: 3,
          }}
          elevation={5}
        >
          <Box
            className="lateral_login"
            sx={{
              width: { xs: "100%", md: "40%" },
              height: { xs: "50vh", md: "100%" },
              borderRadius: 5,
            }}
          />
          <Box
            component="form"
            className="form-log"
            onSubmit={handleSubmit}
            sx={{ p: 2, width: { xs: "100%", md: "40%" } }}
          >
            <Typography
              variant="h4"
              sx={{
                color: { xs: "white", md: "black" },
                fontSize: { xs: "28px", md: "30px" },
                position: { xs: "absolute", md: "static" },
                top: "20%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 50,
                ml: 20,
              }}
            >
              Autenticarme
            </Typography>
            <Stack
              spacing={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
              }}
            >
              {inputs.map((input) => (
                <TextField
                  key={input.id}
                  label={input.name}
                  variant="outlined"
                  fullWidth
                  {...input}
                  value={values[input.name]}
                  placeholder={input.placeholder}
                  type={input.type}
                  onChange={onChange}
                />
              ))}
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  color="success"
                  onClick={() => navigate("/")}
                  sx={{ fontSize: { xs: "10px" } }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  onSubmit={handleSubmit}
                  sx={{ fontSize: { xs: "10px" } }}
                >
                  Aceptar
                </Button>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: { xs: "12px" } }}>
              No tienes una cuenta?
              <Typography
                component="a"
                onClick={() => {
                  navigate("/register");
                }}
                sx={{
                  color: "green",
                  fontSize: { xs: "12px" },
                  cursor: "pointer",
                }}
              >
                Registrarse
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
