import { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import "../App.css";
import "./Compra.css";
import CarritoContext from "@/context/CarritoContext";
import { CarritoContextValue } from "@/types/CarritoContextValue";
import ItemCarrito from "@/components/producto/ItemCarrito";

const FormProductos = () => {
  const { carrito } = useContext(CarritoContext) as CarritoContextValue;

  const totalPrice = carrito?.reduce((accumulator, product) => {
    return accumulator + product.producto.precio * product.cantidad;
  }, 0);

  const totalDelivery =
    carrito?.reduce((accumulator) => {
      return accumulator + 1;
    }, 0) + 5;

  return (
    <Box component="form">
      <Stack spacing={1} sx={{ mt: 5, display: "flex", alignItems: "center" }}>
        <Box sx={{ bgcolor: "gainsboro", width: "95%", p: 1 }}>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography sx={{ fontFamily: "poppins", pointerEvents: "none" }}>
              Subtotal [
              {carrito.reduce((total, compra) => {
                return total + compra.cantidad;
              }, 0)}{" "}
              producto{carrito.length > 1 && "s"}]
            </Typography>
            <Typography sx={{ fontFamily: "poppins", pointerEvents: "none" }}>
              ${totalPrice}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography sx={{ fontFamily: "poppins", pointerEvents: "none" }}>
              Costo de delivery
            </Typography>
            <Typography sx={{ fontFamily: "poppins", pointerEvents: "none" }}>
              ${totalDelivery}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ width: "95%" }}>
          <Stack
            className="Lista"
            sx={{
              width: "100%",
              maxHeight: "50vh",
              overflow: "auto",
              border: "2px solid lightgreen",
              borderRadius: 3,
            }}
          >
            {carrito?.map((product) => (
              <ItemCarrito key={product.id} product={product} modal={true} />
            ))}
          </Stack>
        </Box>
        <Box sx={{ bgcolor: "gainsboro", width: "95%", p: 1 }}>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography sx={{ fontFamily: "poppins", pointerEvents: "none" }}>
              Monto Total
            </Typography>
            <Typography sx={{ fontFamily: "poppins", pointerEvents: "none" }}>
              ${totalDelivery + totalPrice}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default FormProductos;
