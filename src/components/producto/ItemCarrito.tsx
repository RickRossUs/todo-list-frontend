import { useContext } from "react";
import CarritoContext from "@/context/CarritoContext";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CarritoContextValue } from "@/types/CarritoContextValue";
import { Carrito } from "@/types/Carrito";

const ItemCarrito = ({
  product,
  modal,
}: {
  product: Carrito;
  modal: boolean;
}) => {
  const { plusCarrito, removeFromCarrito } = useContext(
    CarritoContext
  ) as CarritoContextValue;

  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2} sx={{width:400}}>
          <Box
            component="img"
            src={product.producto.imagen}
            sx={{
              width: 70,
              height: 70,
              aspectRatio: "1/1",
              borderRadius: 2,
              objectFit: "cover",
            }}
          ></Box>
        </Grid>
        <Grid item xs={modal ? 1.5 : 2}>
          <ListItemText
            sx={{
              pointerEvents: "none",
              display: { xs: "none", md: "block" },
            }}
          >
            {product.producto.nombre}
          </ListItemText>
        </Grid>
        <Grid item xs={modal ? 1.5 : 2}>
          <ListItemText
            sx={{
              pointerEvents: "none",
              display: { xs: "none", md: "block" },
            }}
          >
            ${product.producto.precio}
          </ListItemText>
        </Grid>
        <Grid item xs={1}>
          <ListItemText sx={{ pointerEvents: "none" }}>
            {product.cantidad}
          </ListItemText>
        </Grid>
        {modal && (
          <Grid item xs={modal ? 1.5 : 2}>
            <ListItemText
              sx={{
                pointerEvents: "none",
                display: { xs: "none", md: "block" },
              }}
            >
              {(product.cantidad * product.producto.precio).toFixed(2)}
            </ListItemText>
          </Grid>
        )}
        <Grid item xs={4.5}>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ItemCarrito;
