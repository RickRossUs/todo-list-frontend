import { useContext, useState } from "react";
import CarritoContext from "@/context/CarritoContext";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Badge, Typography, List, Paper, Divider } from "@mui/material";
import ItemCarrito from "./ItemCarrito";
import { CarritoContextValue } from "@/types/CarritoContextValue";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";

const PaperCarrito = () => {
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const { carrito } = useContext(CarritoContext) as CarritoContextValue;

  const totalPrice = carrito?.reduce((accumulator, product) => {
    return accumulator + product.producto.precio * product.cantidad;
  }, 0);

  const totalCantidad = carrito?.reduce((accumulator, product) => {
    return (accumulator += product.cantidad);
  }, 0);

  return (
    <div>
      <Box
        sx={{
          cursor: "pointer",
          fontSize: { xs: "14px", md: "18px", lg: "20px" },
        }}
        onClick={() => setActive(!active)}
      >
        <Badge
          color="error"
          variant="standard"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          invisible={false}
          sx={{ width: "25px", m: "0 5px 0 20px" }}
          badgeContent={totalCantidad}
          showZero={false}
        >
          <ShoppingCartIcon />
        </Badge>
      </Box>
      <Paper
        className={`lista-compras ${active ? "" : "hidden"}`}
        elevation={5}
        sx={{
          position: "absolute",
          right: 0,
          top: { xs: "50px", md: "" },
          zIndex: 2,
          width: { xs: "60vw", md: "60vw" },
          minWidth: "20vh",
          maxWidth: { xs: "70vh", md: "80vh" },
          overflow: "auto",
          mt: 0,
          borderRadius: 3,
          pt: 1,
          pl: { xs: 0, md: 1 },
          pr: { xs: 0, md: 1 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 10,
          borderColor: "white",
        }}
      >
        {carrito?.length > 0 ? (
          <>
            <List
              className="producto"
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                p: 0,
              }}
            >
              {carrito.map((product) => (
                <ItemCarrito key={product.id} product={product} modal={false} />
              ))}
            </List>
            <Divider sx={{ width: "90%", mb: 2 }} />
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
              <Box
                className="total-contenedor"
                sx={{
                  bgcolor: "lightgreen",
                  width: { xs: "100%", md: "60%" },
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  ml:2,
                }}
              >
                <Typography sx={{}}>Total:</Typography>
                <Typography>{totalPrice}</Typography>
              </Box>
              <Box
                onClick={() => {
                  navigate("/comprar");
                }}
                component="i"
                sx={{
                  cursor: "pointer",
                  bgcolor: "red",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  height: { xs: "40px", md: "40px" },
                  width: { xs: "20px", md: "20px" },
                  p: "0 20px",
                  mr:2,
                  fontSize: {
                    xs: "10",
                    md: "16px",
                    height: { xs: "1rem" },
                  },
                }}
              >
                <PaymentIcon />
              </Box>
            </Box>
          </>
        ) : (
          <p className="cart-empty">
            <Box
              component="i"
              className="bi bi-exclamation-diamond"
              color="red"
            ></Box>{" "}
            No hay productos añadidos
          </p>
        )}
        <Box
          component="i"
          onClick={() => setActive(!active)}
          sx={{
            position: "absolute",
            top: "2%",
            right: "2%",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </Box>
      </Paper>
    </div>
  );
};

export default PaperCarrito;
