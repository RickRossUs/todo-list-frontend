import React, { useContext } from "react";
import { Card, Typography, Box, Grid } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CCharacter from "./CCharacter";
import CBtnBuyAndDelete from "./CBtnBuyAndDelete";
import CBtnBuyAndRemove from "./CBtnBuyAndRemove";
import { Event } from "../types/Event";
import TicketsContext from "../context/TicketsContext";

const CCard = ({ event, count, myEvent }) => {
  const { isMyEvent } = useContext(TicketsContext);

  const getMonthName = (monthIndex: number): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  return (
    <>
      <Card
        sx={{
          height: 100,
          p: 0,
          borderRadius: 3,
          bgcolor: "transparent",
          border: "0",
          boxShadow: "10px  10px  10px rgba(0,0,0,0.3)",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={2}
            sm={2.4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#5ABE5D",
            }}
          >
            <Typography
              sx={{
                py: 0,
                m: 0,
                fontSize: { sm: "2rem", md: "3rem" },
                fontWeight: "bold",
                color: "white",
                lineHeight: 1,
              }}
            >
              {event?.date?.substring(8, 10)}
            </Typography>
            <Typography
              sx={{
                p: 0,
                m: 0,
                fontSize: { md: "1.5rem", sm: "1rem" },
                fontWeight: "bold",
                color: "white",
              }}
            >
              {getMonthName(Number(event?.date?.substring(5, 7)))}
            </Typography>
          </Grid>

          <Grid item xs={8} sm={7.2} sx={{ p: 1, bgcolor: "white" }}>
            <Grid container spacing={2} sx={{ color: "rgb(100,100,100)" }}>
              <Grid
                item
                lg={7}
                sx={{
                  fontSize: "1rem",
                }}
              >
                <Typography variant="h5" component="div">
                  {event?.name}
                </Typography>
                <Typography
                  sx={{
                    width: "100%",
                    fontSize: ".8rem",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                  }}
                  color="text.secondary"
                >
                  {event?.description}
                </Typography>
              </Grid>
              <Grid
                item
                lg={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <CCharacter
                  icon={StoreMallDirectoryIcon}
                  text={event?.categorie?.name}
                />
                <CCharacter
                  icon={EventSeatIcon}
                  text={event?.remaining_tickets}
                />
                <CCharacter icon={AttachMoneyIcon} text={event?.price} />
                <CCharacter
                  icon={AccessTimeIcon}
                  text={event?.date?.substring(11, 16)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            sm={2.4}
            sx={{ m: 0, p: 0, bgcolor: "transparent" }}
          >
            {count ? (
              <CBtnBuyAndRemove
                remaining_tickets={event?.remaining_tickets}
                id={event.id}
                count={count}
              />
            ) : myEvent ? (
              <CBtnBuyAndDelete
                remaining_tickets={event?.remaining_tickets}
                id={event.id}
                msg={"DEL"}
                myEvent={myEvent}
              />
            ) : (
              <CBtnBuyAndDelete
                remaining_tickets={event?.remaining_tickets}
                id={event.id}
                msg={"BUY"}
                myEvent={myEvent}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CCard;
