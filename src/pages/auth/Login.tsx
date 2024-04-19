import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";
import Loading from "@/components/snipper/loading";
import CInputField from "@/components/form/CInputField";
import { LoginInformacion } from "@/forms/LoginInformacion";
import "./Login.css";

const Login = () => {
  const [values, setValues] = useState({
    user: "",
    password: "",
  });

  const navigate = useNavigate();
  const { loginUsuario } = useContext(AuthContext);
  const { getPerfil } = useContext(UsuarioContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = await loginUsuario(data);
      if (token) {
        getPerfil();
        navigate("/");
      } else {
        console.error("Error al autenticar al usuario");
      }
    } catch (error) {
      console.error("Error al autenticar al usuario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
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
            onSubmit={handleSubmit(onSubmit)}
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
              {LoginInformacion.map((field) => (
                <CInputField
                  name={field.name}
                  control={control}
                  label={field.label}
                  type={field.type}
                  rules={field.rules}
                  errors={errors}
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
