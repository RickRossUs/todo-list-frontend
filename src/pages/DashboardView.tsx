import React, { useContext } from "react";
import { Grid, Box } from "@mui/material";
import CCard from "../components/CCard";
import EventsContext from "../context/EventsContext";

const DashboardView = ({myEvent}) => {
  const { events } = useContext(EventsContext);

  return (
    <>
      <Box sx={{ width: "100vw", minHeight: "80vh" }}>
        <Grid container spacing={2} sx={{ width: "100%", p: 2 }}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <CCard event={event} myEvent={myEvent} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default DashboardView;
