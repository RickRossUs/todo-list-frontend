import { useState, useContext } from "react";
import { Box, Button, Stack, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthContext from "@/context/AuthContext";
import AlertContext from "@/context/AlertContext";
import UsuarioContext from "@/context/UsuarioContext";
import Loading from "@/components/snipper/loading";
import CInputField from "@/components/form/CInputField";
import { LoginInformacion } from "@/forms/LoginInformacion";
import "./Login.css";
import { AuthContextValue } from "@/types/AuthContextValue";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";
import { AlertContextValue } from "@/types/AlertContextValue";

const Login = () => {

  const navigate = useNavigate();
  const { loginUsuario } = useContext(AuthContext) as AuthContextValue;
  const { getPerfil } = useContext(UsuarioContext) as UsuariosContextValue;
  const { showAlert } = useContext(AlertContext) as AlertContextValue;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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
      showAlert("Usuario incorrecto", "error");
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
              width: { xs: "100%", md: "50%" },
              height: { xs: "50vh", md: "100%" },
              borderRadius: 5,
            }}
          />
          <Box
            component="form"
            className="form-log"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ p: 5, width: { xs: "100%", md: "50%" } }}
          >
            <Typography
              variant="h4"
              sx={{
                color: { xs: "white", md: "black" },
                fontSize: { xs: "28px", md: "30px" },
                textAlign: "center",
                mb: 2,
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
              }}
            >
              {LoginInformacion.map((field) => (
                <CInputField
                  key={field.name}
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
            <Typography
              sx={{ fontSize: { xs: "12px" }, mt: 2, textAlign: "center" }}
            >
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
