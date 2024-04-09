import React, { useContext } from "react";
import { Button } from "@mui/material";
import AlertContext from "../context/AlertContext";
import TicketsContext from "../context/TicketsContext";
import EventsContext from "../context/EventsContext";

const CBtnBuyAndDelete = ({ remaining_tickets, id, msg, myEvent }) => {
  const { showAlert } = useContext(AlertContext);
  const { buyTicket } = useContext(TicketsContext);
  const { deleteEvent } = useContext(EventsContext);

  const handleBuyTicket = (e) => {
    e.preventDefault();
    if (myEvent) {
  deleteEvent({id})
    } else {
      if (remaining_tickets > 0) {
        buyTicket(id);

        showAlert("Satisfactory event purchase", "success");
      } else {
        showAlert("There are no tickets available", "error");
      }
    }
  };

  return (
    <Button
      size="small"
      sx={{
        height: 100,
        width: "100%",
        bgcolor: "#E5514C",
        borderRadius: 0,
        color: "white",
        fontSize: { md: "1.5rem", xs: "1rem" },
        fontWeight: "bold",
      }}
      onClick={handleBuyTicket}
    >
      {msg}
    </Button>
  );
};

export default CBtnBuyAndDelete;
