import React, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "../auth/AuthContext";

const EventsContext = createContext();

export default EventsContext;

export const EventsProvider = ({ children }) => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    let response = await fetch("http://127.0.0.1:8000/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setEvents(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const filterEvents = async (searchParam) => {
    let response = await fetch("http://127.0.0.1:8000/event/" + searchParam, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setEvents(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const myEvents = async (searchParam) => {
    let response = await fetch("http://127.0.0.1:8000/event/myEvents/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setEvents(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const postEvent = async (event) => {
    const response = await fetch("http://127.0.0.1:8000/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(event),
    });
    const newTicket = await response.json();
    setEvents(newTicket);
  };

  const deleteEvent = async (id) => {
    const response = await fetch("http://127.0.0.1:8000/event/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(id),
    });
    const newTicket = await response.json();
    setEvents(newTicket);
  };

  const value = {
    events: events,
    setEvents: setEvents,
    getEvents: getEvents,
    filterEvents: filterEvents,
    myEvents: myEvents,
    postEvent: postEvent,
    deleteEvent: deleteEvent,
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};
