import React, { useState, useContext } from "react";
import FormInput from "../../components/formInput/FormInput";
import "../../components/formInput/formInput.css";
import { Box, Button, Stack, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/auth/AuthContext";

const LoginUno = () => {
  const [values, setValues] = useState({
    user: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "user",
      type: "text",
      placeholder: "Usuario",
      errorMessage:
        "El nombre de usuario debe ser único, debe contener entre 3 y 16 caracteres y no usar símbolos especiales.",
      //pattern:`^[A-Za-z0-9]{3,16}$`,
      // pattern: `Michell01`,
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      errorMessage: "La contraseña debe contener letras, números y símbolos.",
      //pattern: `^(?=.*[0-9])(?=.-[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      //pattern: `^[A-Za-z0-9]{3,16}$`,
      // pattern: `M1ch3ll@`,
      required: true,
    },
  ];

  const navigate = useNavigate();
  const { loginUser, fetchPerfil } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ username: values.user, password: values.password });
    navigate('/')
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
            className="img-back"
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
            sx={{ p: 2 }}
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
                width: "100%",
              }}
            >
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  placeholder={input.placeholder}
                  type={input.type}
                  onChange={onChange}
                  sx={{width: '100%', bgcolor:'red', p:3}}
                />
              ))}
              <Box
                sx={{
                  width: "300px",
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
                onClick={() => {navigate("/register")}}
                sx={{ color: "green", fontSize: { xs: "12px" } , cursor: "pointer" }}
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

export default LoginUno;
