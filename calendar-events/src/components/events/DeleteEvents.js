import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import api from "../../services/api";

function DeleteEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      await api.delete(`/events/${selectedEvent.id}`);
      await fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error("Erro ao deletar o evento:", error);
    }
  };

  const handleCancel = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Deletar Evento</h1>
      <div className="row">
        <div className="col-md-4">
          <h4>Selecionar Evento</h4>
          <ul className="list-group">
            {events.map((event) => (
              <li
                key={event.id}
                className={`list-group-item ${
                  selectedEvent && event.id === selectedEvent.id ? "active" : ""
                }`}
                onClick={() => handleSelectEvent(event)}
                style={{ cursor: "pointer" }}
              >
                {event.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          {selectedEvent && (
            <div className="event-container shadow rounded mt-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">
                  <b>Detalhes do Evento</b>
                </h3>
                <p className="card-text">
                  <b>Título:</b> {selectedEvent.title}
                </p>
                <p className="card-text">
                  <b>Descrição:</b> {selectedEvent.description}
                </p>
                <p className="card-text">
                  <b>Data de Início:</b> {selectedEvent.startsDate}
                </p>
                <p className="card-text">
                  <b>Data de Término:</b> {selectedEvent.endsDate}
                </p>
                <p className="card-text">
                  <b>Status:</b> {selectedEvent.status ? "Ativo" : "Inativo"}
                </p>
                <p className="card-text">
                  <b>Instituição:</b> {selectedEvent.institution.name}
                </p>
                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-danger me-3"
                    onClick={handleDeleteEvent}
                    style={{ width: "150px" }}
                  >
                    Deletar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleCancel}
                    style={{ width: "150px" }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Link
        to="/events"
        className="btn btn-primary position-absolute top-0 start-0 m-3"
      >
        <BsArrowLeft />
      </Link>
    </div>
  );
}

export default DeleteEvents;
