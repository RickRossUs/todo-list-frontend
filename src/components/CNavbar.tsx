import React, { useContext, useState } from "react";
import { Box, Paper, InputBase, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListIcon from "@mui/icons-material/List";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonIcon from "@mui/icons-material/Person";
import AuthContext from "../auth/AuthContext";
import EventsContext from "../context/EventsContext";
import { useNavigate } from "react-router-dom";
import CBtnNavbar from "../common/CBtnNavbar";

const CNavbar: React.FC<CNavbarProps> = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { filterEvents, myEvents, getEvents } = useContext(EventsContext);
  const [searchValue, setSearchValue] = useState("");
  const [isDashboard, setIsDashboard] = useState(true);
  const [isMyEvents, setIsMyEvents] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    await filterEvents(searchValue);
  };

  const handleMyEvent = async (event) => {
    event.preventDefault();

    if (!isDashboard) {
      setIsDashboard(!isDashboard);
      navigate("/");
    }
    if (!isMyEvents) {
      myEvents();
      navigate("/my-events");
    } else {
      getEvents();
      navigate("/");
    }
    setIsMyEvents(!isMyEvents);
  };

  const handleMyTickets = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (isMyEvents) setIsMyEvents(!isMyEvents);
    if (isDashboard) {
      navigate("/tickets");
    } else {
      getEvents();
      navigate("/");
    }
    setIsDashboard(!isDashboard);
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    navigate("/event");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "90%",
            m: 2,
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.5)",
          }}
          onSubmit={handleSearch}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search event"
            inputProps={{ "aria-label": "search event" }}
            value={searchValue} // Step 2: Bind the input's value to the state
            onChange={(e) => setSearchValue(e.target.value)} // Update the state on change
            disabled={!isDashboard}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            disabled={!isDashboard}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CBtnNavbar icon={MoreTimeIcon} onClick={handleCreateEvent} />

          {isMyEvents ? (
            <CBtnNavbar icon={ListIcon} onClick={handleMyEvent} />
          ) : (
            <CBtnNavbar icon={PersonIcon} onClick={handleMyEvent} />
          )}

          {isDashboard ? (
            <CBtnNavbar icon={ShoppingCartIcon} onClick={handleMyTickets} />
          ) : (
            <CBtnNavbar icon={ListIcon} onClick={handleMyTickets} />
          )}

          <CBtnNavbar
            icon={PowerSettingsNewIcon}
            color={"#E5514C"}
            onClick={logoutUser}
          />
        </Box>
      </Box>
    </>
  );
};

export default CNavbar;
