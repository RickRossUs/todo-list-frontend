import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import "@/assets/css/Perfil.css";
import UsuarioContext from "@/context/UsuarioContext";
import ProductosContext from "@/context/ProductosContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ImageUploader from "@/components/form/ImageUploader";
import InputField from "@/components/form/CInputField";
import CInputChip from "../components/form/CInputChip";

const CrearProducto = () => {
  const [imagen, setImage] = useState(null);
  const [fileName, setFileName] = useState("No hay imagen");
  const [checked, setChecked] = useState(null);
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

    productId ? updateProducto(formData, productId) : postProducto(formData);

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
          <ImageUploader
            imagen={imagen}
            fileName={fileName}
            setFileName={setFileName}
            setImage={setImage}
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <form className="form-info-add">
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "space-around",
                mt: { xs: 2, md: 3 },
                mb: { xs: 1, md: 2 },
              }}
            >
              <InputField
                name="nombre"
                control={control}
                label="Nombre"
                rules={{ required: "Nombre es requerido" }}
                errors={errors}
              />
              <InputField
                name="descripcion"
                control={control}
                label="Descripción"
                rules={{ required: "Descripción es requerida" }}
                errors={errors}
              />
            </Box>
            <Box>
              <CInputChip
                name="categoria"
                control={control}
                rules={{ required: "Categoría es requerida" }}
                errors={errors}
                lista={categorias}
                checked={checked}
                setChecked={setChecked}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: { xs: 2, md: 3 },
                alignItems: "center",
              }}
            >
              <InputField
                name="precio"
                control={control}
                label="Precio"
                rules={{
                  required: "Precio es requerido",
                  pattern: {
                    value: /^\d*(\.\d+)?$/,
                    message: "Solo se permiten números",
                  },
                }}
                errors={errors}
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
