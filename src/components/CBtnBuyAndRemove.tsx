import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import AlertContext from "../context/AlertContext";
import TicketsContext from "../context/TicketsContext";

const CBtnBuyAndRemove = ({ remaining_tickets, id, count }) => {
  const { showAlert } = useContext(AlertContext);
  const { buyTicket, removeTicket } = useContext(TicketsContext);

  const handleBuyTicket = (e) => {
    e.preventDefault();

    if (remaining_tickets > 0) {
      buyTicket(id);

      showAlert("Satisfactory event purchase", "success");
    } else {
      showAlert("There are no tickets available", "error");
    }
  };

  const handleRemoveTicket = (e) => {
    e.preventDefault();

    removeTicket(id);

    showAlert("Satisfactory event purchase", "success");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        size="small"
        sx={{
          height: 50,
          width: "100%",
          bgcolor: "#5ABE5D",
          borderRadius: 0,
          color: "white",
          fontSize: { md: "1.5rem", xs: "1.5rem" },
          fontWeight: "bold",
        }}
        onClick={handleBuyTicket}
      >
        +
      </Button>
      <Button
        size="small"
        sx={{
          height: 50,
          width: "100%",
          bgcolor: "#E5514C",
          borderRadius: 0,
          color: "white",
          fontSize: { md: "1.5rem", xs: "1.5rem" },
          fontWeight: "bold",
        }}
        onClick={handleRemoveTicket}
      >
        -
      </Button>
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          py: 0,
          m: 0,
          fontSize: { sm: "3rem", md: "4rem" },
          fontWeight: "bold",
          color: "rgba(255,255,255,0.5)",
          pointerEvents: "none",
        }}
      >
        {count}
      </Typography>
    </Box>
  );
};

export default CBtnBuyAndRemove;
