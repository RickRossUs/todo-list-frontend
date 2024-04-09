import { useContext, useState } from "react";
import CarritoContext from "@/context/CarritoContext";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Badge,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemButton,
  Divider,
} from "@mui/material";

const PaperCarrito = () => {
  const [active, setActive] = useState(false);
  const [cant, setCant] = useState(0);
  const [invisible, setInvisible] = useState(false);
  const navigate = useNavigate();
  
  const {
    carrito,
    setCarrito,
    getCarrito,
    buyCarrito,
    plusCarrito,
    removeFromCarrito,
  } = useContext(CarritoContext);

  const totalPrice = carrito.reduce((accumulator, product) => {
    return accumulator + product.producto.precio * product.cantidad;
  }, 0);

  const totalCantidad = carrito.reduce((accumulator, product) => {
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
          invisible={invisible}
          sx={{ width: "25px", m:"0 5px 0 20px" }}
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
        {carrito ? (
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
                <ListItem
                  className="info"
                  key={product.id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box
                    component="img"
                    src={product.producto.imagen}
                    sx={{
                      width: { xs: "20%", md: "10%" },
                      aspectRatio: "1/1",
                      borderRadius: 2,
                      mr: 2,
                      objectFit: "cover",
                    }}
                  ></Box>
                  <ListItemText sx={{ pointerEvents: "none" }}>
                    {product.cantidad}
                  </ListItemText>
                  <ListItemText
                    sx={{
                      pointerEvents: "none",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    {product.producto.nombre}
                  </ListItemText>
                  <ListItemText
                    sx={{
                      pointerEvents: "none",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    ${product.producto.precio}
                  </ListItemText>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "250px",
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        plusCarrito(product.id, true);
                      }}
                      sx={{
                        bgcolor: { xs: "transparent", md: "#90ee908a" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 2,
                        mr: 1,
                        aspectRatio: "1/1",
                        height: { xs: "40px", md: "40px" },
                        width: { xs: "20px", md: "20px" },
                        fontSize: {
                          xs: "10",
                          md: "16px",
                          height: { xs: "2rem" },
                        },
                      }}
                    >
                      +
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        plusCarrito(product.id, false);
                      }}
                      sx={{
                        bgcolor: { xs: "transparent", md: "#90ee908a" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 2,
                        mr: 1,
                        height: { xs: "40px", md: "40px" },
                        width: { xs: "20px", md: "20px" },
                        fontSize: {
                          xs: "10",
                          md: "16px",
                          height: { xs: "2rem" },
                        },
                      }}
                    >
                      -
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        removeFromCarrito(product.id);
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
                        fontSize: {
                          xs: "10",
                          md: "16px",
                          height: { xs: "1rem" },
                        },
                      }}
                    >
                      <DeleteIcon />
                    </ListItemButton>
                  </ListItem>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ width: "90%", mb: 2 }} />
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
              }}
            >
              <Typography sx={{}}>Total:</Typography>
              <Typography>{totalPrice}</Typography>
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
