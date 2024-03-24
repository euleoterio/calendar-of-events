import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import EventComponent from "./EventComponent";
import { BsArrowLeft } from "react-icons/bs";

function ViewEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao buscar os eventos:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <Link to="/events" className="btn btn-primary">
            <BsArrowLeft />
          </Link>
        </div>
      </div>
      <h1 className="text-center mb-4">Visualização de Eventos</h1>
      <div className="row mt-4">
        {events.map((event, index) => (
          <div key={index} className="col-md-4">
            <EventComponent event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewEvents;
