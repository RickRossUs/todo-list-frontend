import { useState, useEffect, useContext } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

const CrearPerfil = () => {
  const [imagen, setImage] = useState(null);
  const [fileName, setFileName] = useState("No hay imagen");
  const { authTokens, user, fetchPerfil, setUser, updateUser, getImageSrc } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const updateUsuario = async (data) => {
    const formData = new FormData();

    const direccion = {
      ...(data?.provincia ? { provincia: data.provincia } : {}),
      ...(data?.municipio ? { municipio: data.municipio } : {}),
      ...(data?.calle ? { calle: data.calle } : {}),
      ...(data?.casa ? { casa: data.casa } : {}),
    };

    const response = await fetch(
      "http://127.0.0.1:8000/usuarios/direccion/" + user?.direccion?.id + "/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(direccion),
      }
    );

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
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    setValue("username", user?.username);
    setValue("email", user?.email);
    setValue("first_name", user?.first_name);
    setValue("last_name", user?.last_name);
    setValue("provincia", user?.direccion?.provincia);
    setValue("municipio", user?.direccion?.municipio);
    setValue("calle", user?.direccion?.calle);
    setValue("casa", user?.direccion?.casa);
    if (user?.imagen) {
      setImage(user?.imagen);
      // setFileName("");
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
          <form
            className="form-img-add"
            onClick={() => document.querySelector(".input-img").click()}
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
              if (files) {
                setImage(URL.createObjectURL(files[0]));
              }
            }}
          >
            <input
              type="file"
              accept="image/*"
              required
              className="input-img"
              hidden
              {...register("imagen", {})}
              error={!!errors.imagen}
              helperText={errors.imagen?.message}
            />
            {imagen ? (
              <Box
                component="img"
                src={getImageSrc(imagen)}
                sx={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: { xs: 2, md: 5 },
                  position: "relative",
                }}
                alt={fileName}
              />
            ) : (
              <>
                <Box
                  component="i"
                  color="white"
                  fontSize={40}
                  sx={{
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontFamily: "poppins", color: "white" }}>
                    Subir una imagen..
                  </Typography>
                </Box>
              </>
            )}
          </form>
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
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nombre es requerido",
                  validate: (value) =>
                    (value && value.length > 5) ||
                    "Debe contener más de 6 caracteres",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre de usuario"
                    type="text"
                    size="small"
                    color="success"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Correo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Correo no válido",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Correo"
                    type="email"
                    size="small"
                    color="success"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                rules={{}}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre"
                    type="text"
                    size="small"
                    color="success"
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                  />
                )}
              />

              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                rules={{}}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Apellidos"
                    type="text"
                    size="small"
                    color="success"
                    error={!!errors.apellidos}
                    helperText={errors.apellidos?.message}
                  />
                )}
              />
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
              <Controller
                name="provincia"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Provincia"
                    variant="outlined"
                    size="small"
                    color="success"
                  />
                )}
              />

              <Controller
                name="municipio"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Municipio"
                    variant="outlined"
                    size="small"
                    color="success"
                  />
                )}
              />

              <Controller
                name="calle"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Calle"
                    variant="outlined"
                    size="small"
                    color="success"
                  />
                )}
              />

              <Controller
                name="casa"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Casa"
                    variant="outlined"
                    size="small"
                    color="success"
                  />
                )}
              />
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
