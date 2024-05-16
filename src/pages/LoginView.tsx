import { useState, useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Box, Typography, Button } from "@mui/material";
import AuthContext from "@/context/AuthContext";
import { AuthContextValue } from "@/types/AuthContextValue";
import AlertContext from "@/context/AlertContext";
import { AlertContextValue } from "@/types/AlertContextValue";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/snipper/loading";
import { LoginInformacion } from "@/forms/LoginInformacion";
import CInputField from "@/components/form/CInputField";
import UsuarioContext from "@/context/UsuarioContext";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";

const LoginView = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { loginUsuario } = useContext(AuthContext) as AuthContextValue;
  const { registerUser, getPerfil } = useContext(UsuarioContext) as UsuariosContextValue;
  const { showAlert } = useContext(AlertContext) as AlertContextValue;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const token = !login
        ? await loginUsuario(data, async () => {
            await getPerfil();
          })
        : await registerUser(data, async () => {
            await loginUsuario(data);
          });
      if (token) {
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
    <>
      {isLoading && <Loading />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 1000,
            py: 7,
            px: 5,
            bgcolor: "rgba(255,255,255,0.5)",
            borderRadius: 3,
            boxShadow: "10px  10px  10px rgba(0,0,0,0.4)",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            sx={{
              pb: 3,
              m: 0,
              fontSize: { sm: "2rem", md: "3rem" },
              fontWeight: "bold",
              color: "#5ABE5D",
              lineHeight: 1,
            }}
          >
            {login ? "REGISTER" : "LOGIN"}
          </Typography>
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
          <Button
            size="small"
            sx={{
              height: 40,
              width: "100%",
              mt: 2,
              bgcolor: "#E5514C",
              borderRadius: 3,
              border: "1px solid #E5514C",
              color: "white",
              fontSize: { md: "1rem", xs: ".8rem" },
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#E5514C",
                border: "1px solid #E5514C",
              },
            }}
            type="submit"
          >
            {login ? "REGISTER" : "LOGIN"}
          </Button>
          <Box
            sx={{ color: "green", mt: 3, cursor: "pointer" }}
            onClick={() => {
              setLogin(!login);
            }}
          >
            {!login ? "Register >" : "Login >"}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginView;
