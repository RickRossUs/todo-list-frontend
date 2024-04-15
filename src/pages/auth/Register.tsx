import { useState, useContext } from "react";
import { Grid, Paper, Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";

const Register = () => {
  const navigate = useNavigate();
  const { loginUsuario } = useContext(AuthContext);
  const { registerUser } = useContext(UsuarioContext);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");

  const createUser = async (data) => {
    const register = await registerUser(data);
    if (register) {
      const login = await loginUsuario({ username: data.username, password: data.password });
      if (login) {
        navigate("/detalles-perfil");
      }
    }
  };

  const handleCancel = () => {
    setFormValues({
      user: "",
      email: "",
      password: "",
    });
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
            // gap: 1,
            fontFamily: "poppins",
          }}
          onSubmit={handleSubmit(createUser)}
        >
          <Typography
            component="h5"
            variant="h5"
            sx={{ fontFamily: "poppins", mt: 5 }}
          >
            Registrarme
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              color="success"
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              {...register("username", {
                required: "Username requerido",
                validate: (value) =>
                  (value && value.length > 5) ||
                  "Debe contener más de 6 caracteres",
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              color="success"
              fullWidth
              id="email"
              label="Correo"
              name="email"
              {...register("email", {
                required: "Correo requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Correo no válido",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              variant="outlined"
              color="success"
              margin="normal"
              fullWidth
              id="password"
              label="Contraseña"
              name="password"
              type="password"
              {...register("password", {
                required: "Contraseña requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "La contraseña debe contener al menos una letra mayúscula",
                  hasSpecialChar: (value) =>
                    /[@$!%*?&.]/.test(value) ||
                    "La contraseña debe contener al menos un carácter especial",
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "La contraseña debe contener al menos una letra minúscula",
                  hasNumber: (value) =>
                    /\d/.test(value) ||
                    "La contraseña debe contener al menos un número",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              variant="outlined"
              color="success"
              margin="normal"
              fullWidth
              id="passwordConfirm"
              label="Verificar contraseña"
              name="passwordConfirm"
              type="password"
              {...register("passwordConfirm", {
                required: "Confirmación de contraseña requerida",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
            />

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
