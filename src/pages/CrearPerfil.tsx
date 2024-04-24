import { useState, useEffect, useContext } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import UsuarioContext from "@/context/UsuarioContext";
import { useNavigate } from "react-router-dom";
import "@/assets/css/Perfil.css";
import ImageUploader from "@/components/form/ImageUploader";
import InputField from "@/components/form/CInputField";
import { fetchDireccion } from "@/services/UsuariosService";
import { UsuarioInformacion } from "@/forms/UsuarioInformacion";
import { DireccionInformacion } from "@/forms/DireccionInformacion";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";

const CrearPerfil = () => {
  const [imagen, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No hay imagen");
  const { user, setUser, updateUser } = useContext(
    UsuarioContext
  ) as UsuariosContextValue;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const updateUsuario: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    const direccion = new FormData();

    data?.provincia && direccion.append("provincia", data.provincia);
    data?.municipio && direccion.append("municipio", data.municipio);
    data?.calle && direccion.append("calle", data.calle);
    data?.casa && direccion.append("casa", data.casa);

    fetchDireccion(user?.direccion?.id || 0, direccion);

    formData.append("username", data?.username);
    formData.append("email", data?.email);
    formData.append("first_name", data?.first_name);
    formData.append("last_name", data?.last_name);

    if (fileName !== "No hay imagen") {
      formData.append("imagen", data.imagen[0]);
    }

    updateUser(formData);
  };

  useEffect(() => {
    setValue("username", user?.username);
    setValue("email", user?.email);
    setValue("first_name", user?.first_name);
    setValue("last_name", user?.last_name);
    setValue("provincia", user?.direccion?.provincia);
    setValue("municipio", user?.direccion?.municipio);
    setValue("calle", user?.direccion?.calle);
    setValue("casa", user?.direccion?.casa);
    if (user?.imagen) {
      setImage(user?.imagen || null);
    }
  }, [user, setValue, setUser]);

  return (
    <div>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{ minWidth: "50%", borderRadius: "10px", p: 2 }}
          onSubmit={handleSubmit(updateUsuario)}
        >
          <ImageUploader
            imagen={imagen}
            fileName={fileName}
            setFileName={setFileName}
            setImage={setImage}
            register={register}
            errors={errors}
          />
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                p: 2,
                gap: 2,
              }}
            >
              {UsuarioInformacion.map((field) => (
                <InputField
                  key={field.name}
                  name={field.name}
                  control={control}
                  label={field.label}
                  type="text"
                  rules={field.rules}
                  errors={errors}
                  defaultValue={""}
                />
              ))}
            </Box>
            <Box
              component="fieldset"
              sx={{
                mb: 2,
                width: "90%",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 2,
                borderRadius: 3,
                borderColor: "lightgreen",
                border: 2,
              }}
            >
              <Typography component="legend" sx={{ fontFamily: "poppins" }}>
                Dirección
              </Typography>
              {DireccionInformacion.map((field) => (
                <InputField
                  name={field.name}
                  control={control}
                  label={field.label}
                  type="text"
                  rules={field.rules}
                  errors={errors}
                  defaultValue={""}
                />
              ))}
            </Box>
            <Box
              sx={{
                width: "60%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  navigate("/perfil");
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={() => {}}
              >
                Aceptar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default CrearPerfil;
