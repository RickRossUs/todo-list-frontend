import { useContext } from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";
import AlertContext from "@/context/AlertContext";
import { RegisterInformacion } from "@/forms/RegisterInformacion";
import CInputField from "@/components/form/CInputField";
import { AuthContextValue } from "@/types/AuthContextValue";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";
import { AlertContextValue } from "@/types/AlertContextValue";
import { AxiosResponse } from "axios";
import type { Usuario } from "@/types/Usuario";

const Register = () => {
  const navigate = useNavigate();
  const { loginUsuario } = useContext(AuthContext) as AuthContextValue;
  const { registerUser } = useContext(UsuarioContext) as UsuariosContextValue;
  const { showAlert } = useContext(AlertContext) as AlertContextValue;

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");

  const adjustedRegisterInformacion = RegisterInformacion.map((field) => {
    if (field.name === "passwordConfirm") {
      return {
        ...field,
        rules: {
          ...field.rules,
          validate: (value: string) =>
            value === password || "Las contraseñas no coinciden",
        },
      };
    }
    return field;
  });

  const createUser: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("email", data.email);

      const register: boolean = await registerUser(formData);
      if (register) {
        const login: AxiosResponse<Usuario> = await loginUsuario({
          username: data.username,
          password: data.password,
        });
        if (login) {
          navigate("/detalles-perfil");
        }
      }
    } catch (error) {
      showAlert("Existe un usuario con ese nombre", "error");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{
          maxWidth: "90%",
          minWidth: "60%",
          height: "80vh",
          display: "flex",
          borderRadius: 5,
          fontFamily: "poppins",
        }}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            width: "65%",
            height: "100%",
            px: 5,
            py: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "poppins",
          }}
          onSubmit={handleSubmit(createUser)}
        >
          <Typography
            component="h5"
            variant="h5"
            sx={{ fontFamily: "poppins" }}
          >
            Registrarme
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              width: "100%",
              mt: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {adjustedRegisterInformacion.map((field) => (
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
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="success"
                onClick={() => {
                  navigate("/");
                }}
                sx={{ width: "40%", fontFamily: "poppins", fontWeight: 700 }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ width: "40%", fontFamily: "poppins" }}
              >
                Aceptar
              </Button>
            </Box>
            <Typography sx={{ fontFamily: "poppins" }}>
              Ya tienes cuenta?{" "}
              <Typography
                component="a"
                sx={{
                  color: "green",
                  fontFamily: "poppins",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Inicia Sesión!
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          className="lateral_register"
          sx={{ width: "35%", height: "100%", borderRadius: 5 }}
        ></Box>
      </Grid>
    </div>
  );
};

export default Register;
