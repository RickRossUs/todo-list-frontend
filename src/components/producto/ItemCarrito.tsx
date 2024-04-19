import { useContext } from "react";
import CarritoContext from "@/context/CarritoContext";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingCartIcon } from "@mui/icons-material/ShoppingCart";

const ItemCarrito = ({ product }) => {
  const { plusCarrito, removeFromCarrito } = useContext(CarritoContext);

  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
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
  );
};

export default ItemCarrito;
