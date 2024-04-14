import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Container,
  InputLabel,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import "@/assets/css/Perfil.css";
import AuthContext from "@/context/AuthContext";
import UsuarioContext from "@/context/UsuarioContext";
import ProductosContext from "@/context/ProductosContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CrearProducto = () => {
  const [imagen, setImage] = useState(null);
  const [fileName, setFileName] = useState("No hay imagen");
  const [checked, setChecked] = useState(null);
  const { authTokens } = useContext(AuthContext);
  const { getPerfil } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const { categorias, getProducto, postProducto, updateProducto } =
    useContext(ProductosContext);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const createProduct = async (data) => {
    const formData = new FormData();
    formData.append("categoria", checked);
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("precio", data.precio);
    if (fileName !== "No hay imagen") {
      formData.append("imagen", data.imagen[0]);
    }

    if (productId) {
      updateProducto(formData, productId);
    } else {
      postProducto(formData);
    }

    getPerfil();
    navigate("/perfil");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProducto(productId);
      setProductData(data);
      setValue("nombre", data?.nombre);
      setValue("descripcion", data?.descripcion);
      setValue("precio", data?.precio);
      setValue("categoria", data?.categoria?.id);
      setChecked(data?.categoria?.id);
      setImage(data?.imagen);
    };  

    if (productId) {
      fetchProduct();
    }
  }, []);

  return (
    <div>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          className="tarjeta-crear-producto"
          sx={{
            width: { xs: "60%", md: "40%" },
            p: 5,
            borderRadius: { xs: 2, md: 5 },
          }}
          onSubmit={handleSubmit(createProduct)}
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
              accept="imagen/*"
              required
              className="input-img"
              hidden
              {...register("imagen", {
                required: productId ? false : "Imagen es requerida",
                validate: (value) =>
                  (value && value.length > 0) ||
                  !!productId ||
                  "Imagen es requerida",
              })}
              error={!!errors.imagen}
              helperText={errors.imagen?.message}
            />

            {imagen ? (
              <Box
                component="img"
                src={imagen}
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
          <form className="form-info-add">
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "space-around",
                mb: { xs: 3, md: 5 },
              }}
            >
              <Controller
                name="nombre"
                control={control}
                defaultValue=""
                rules={{ required: "Nombre es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre"
                    required
                    color="warning"
                    margin="normal"
                    size="small"
                    sx={{ height: "2vh", fontFamily: "poppins" }}
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                  />
                )}
              />
              <Controller
                name="descripcion"
                control={control}
                defaultValue=""
                rules={{ required: "Descripcion es requerida" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    color="warning"
                    margin="normal"
                    size="small"
                    sx={{ height: "2vh", fontFamily: "poppins" }}
                    error={!!errors.descripcion}
                    helperText={errors.descripcion?.message}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="categoria"
                control={control}
                rules={{ required: "Categoría es requerida" }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="hide-radio-button"
                  >
                    {categorias.map((categoria) => (
                      <FormControlLabel
                        key={categoria.id}
                        value={categoria.id}
                        control={<Radio />}
                        label={categoria.nombre}
                        className="hide-radio-button"
                        sx={{
                          bgcolor:
                            checked === categoria.id ? "lightgreen" : "green",
                          p: 1,
                          borderRadius: "15px",
                          m: 1,
                          color: "white",
                        }}
                        onClick={() => {
                          setChecked(categoria.id);
                        }}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.categoria && <p>{errors.categoria.message}</p>}
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: { xs: 2, md: 3 },
                alignItems: "center",
              }}
            >
              <InputLabel>Precio:</InputLabel>
              <Controller
                name="precio"
                control={control}
                defaultValue=""
                rules={{
                  required: "Precio es requerido",
                  pattern: {
                    value: /^\d*(\.\d+)?$/,
                    message: "Solo se permiten números",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="$ 00.00"
                    color="warning"
                    sx={{ width: { xs: "40%" }, ml: "5%" }}
                    error={!!errors.precio}
                    helperText={errors.precio?.message}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                gap: { xs: 1, md: 0 },
                mt: 2,
                width: "90%",
                ml: "5%",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                sx={{ bgcolor: "white" }}
                onClick={() => {
                  navigate("/perfil");
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="success">
                Aceptar
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default CrearProducto;
