import { useContext } from "react";
import { Box, Card, Divider, Typography, Button, Stack } from "@mui/material";
import compra from "@/assets/img/Fondos/compra.jpg";
import FormProductos from "@/components/producto/FormProductos";
import "@/assets/css/Compra.css";
import UsuarioContext from "@/context/UsuarioContext";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import InputField from "@/components/form/CInputField";
import AlertContext from "@/context/AlertContext";
import { AlertContextValue } from "@/types/AlertContextValue";
import CarritoContext from "@/context/CarritoContext";
import { CarritoContextValue } from "@/types/CarritoContextValue";

const Compra = () => {
  const { user } = useContext(UsuarioContext) as UsuariosContextValue;
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext) as AlertContextValue;
  const { carrito, buyCarrito } = useContext(CarritoContext) as CarritoContextValue;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const buy: SubmitHandler<FieldValues> = async () => {
    const isAddressComplete =
      user?.direccion?.provincia &&
      user?.direccion?.municipio &&
      user?.direccion?.calle &&
      user?.direccion?.casa;
    if (!isAddressComplete) {
      showAlert(
        "Por favor, completa tu dirección antes de continuar.",
        "error"
      );
      navigate("/detalles-perfil");
    } else {
      carrito?.map((compra) => (
        buyCarrito(compra.id)
      ))
      showAlert("Compra realizada con éxito")
      navigate(-1)
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        component="form"
        className="Card"
        sx={{
          width: "100%",
          p: "50px 3vw",
          borderRadius: 3,
        }}
        onSubmit={handleSubmit(buy)}
      >
        <Box
          sx={{
            width: "100%",
            height: "30%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={compra}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "250px",
              borderRadius: 3,
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
              color: "white",
            }}
          >
            @{user?.username}
          </Typography>
        </Box>

        <Typography
          color="white"
          component="h4"
          variant="h5"
          sx={{ textAlign: "center", color: "black", fontFamily: "poppins" }}
        >
          {user?.first_name + " " + user?.last_name}
        </Typography>

        <Typography
          color="white"
          component="h4"
          sx={{
            textAlign: "center",
            alignItems: "center",
            color: "grey",
            fontFamily: "poppins",
            mb: 2,
          }}
        >
          {user?.direccion?.provincia && user?.direccion?.provincia + " "}
          {user?.direccion?.municipio && user?.direccion?.municipio + " "}
          {user?.direccion?.calle && user?.direccion?.calle + " "}
          {user?.direccion?.casa && user?.direccion?.casa}
        </Typography>

        <Divider sx={{ borderColor: "green", mb: 5 }} />

        <InputField
          name={"tarjet"}
          control={control}
          label={"Número de tarjeta"}
          type="text"
          rules={{
            required: "Tarjeta requerida",
            minLength: {
              value: 16,
              message: "Debe tener exactamente 16 caracteres",
            },
            maxLength: {
              value: 16,
              message: "Debe tener exactamente 16 caracteres",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Solo se permiten números",
            },
          }}
          errors={errors}
          defaultValue={""}
        />

        <FormProductos />
        <Stack
          direction="row"
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            margin: "5vh auto",
          }}
        >
          <Button
            variant="outlined"
            color="success"
            sx={{ fontFamily: "poppins" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ fontFamily: "poppins" }}
            onClick={() => {}}
          >
            Confirmar
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default Compra;
