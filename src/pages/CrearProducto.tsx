import { useState, useEffect, useContext } from "react";
// import { AxiosResponse } from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container } from "@mui/material";
import "@/assets/css/Perfil.css";
import UsuarioContext from "@/context/UsuarioContext";
import ProductosContext from "@/context/ProductosContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ImageUploader from "@/components/form/ImageUploader";
import InputField from "@/components/form/CInputField";
import CInputChip from "../components/form/CInputChip";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";
import { ProductosContextValue } from "@/types/ProductosContextValue";
import type { Producto } from "@/types/Producto";

const CrearProducto = () => {
  const [imagen, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No hay imagen");
  const [checked, setChecked] = useState<number>(0);
  const { getPerfil } = useContext(UsuarioContext) as UsuariosContextValue;
  const navigate = useNavigate();
  const { productId } = useParams();
  const { categorias, getProducto, postProducto, updateProducto } = useContext(
    ProductosContext
  ) as ProductosContextValue;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const createProduct: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("categoria", checked.toString());
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("precio", data.precio.toString());
    if (fileName !== "No hay imagen") {
      formData.append("imagen", data.imagen[0]);
    }

    let response: boolean;

    productId
      ? (response = await updateProducto(formData, Number(productId)))
      : (response = await postProducto(formData));

    if (response) {
      getPerfil();
      navigate("/perfil");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response: Producto = (await getProducto(
        Number(productId)
      )) as Producto;
      setValue("nombre", response?.nombre);
      setValue("descripcion", response?.descripcion);
      setValue("precio", response?.precio);
      setValue("categoria", response?.categoria?.id);
      setChecked(response?.categoria?.id);
      setImage(response?.imagen || null);
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
            // setValue={setValue}
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
                type="text"
                rules={{ required: "Nombre es requerido" }}
                errors={errors}
                defaultValue={""}
              />
              <InputField
                name="descripcion"
                control={control}
                label="Descripción"
                type="text"
                rules={{ required: "Descripción es requerida" }}
                errors={errors}
                defaultValue={""}
              />
            </Box>
            <Box>
              <CInputChip
                name="categoria"
                label="Categoria"
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
                type="text"
                rules={{
                  required: "Precio es requerido",
                  pattern: {
                    value: /^\d*(\.\d+)?$/,
                    message: "Solo se permiten números",
                  },
                }}
                errors={errors}
                defaultValue={""}
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
