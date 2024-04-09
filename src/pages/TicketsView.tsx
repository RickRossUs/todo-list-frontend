import React, { useContext } from "react";
import { Grid, Box } from "@mui/material";
import CCard from "../components/CCard";
import TicketsContext from "../context/TicketsContext";

const TicketsView = () => {
  const { tickets } = useContext(TicketsContext);

  return (
    <>
      <Box sx={{ width: "100vw", minHeight: "80vh" }}>
        <Grid container spacing={2} sx={{ width: "100%", p: 2 }}>
          {tickets.map((ticket, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <CCard event={ticket.event} count={ticket.count} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default TicketsView;
