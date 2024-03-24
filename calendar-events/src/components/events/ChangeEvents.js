import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangeEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);

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
    setEditedEvent({ ...event });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { id, title, description, startsDate, endsDate } = editedEvent;
      await api.put(`/events/${id}`, {
        title,
        description,
        startsDate,
        endsDate,
        institution: {
          id: editedEvent.institution.id,
        },
      });
      fetchEvents();
      setEditedEvent(null);
    } catch (error) {
      console.error("Erro ao editar o evento:", error);
      if (error.response && error.response.data) {
        toast.error(`Erro ao editar o evento: ${error.response.data}`);
      } else {
        toast.error(
          "Erro ao editar o evento. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/events" className="btn btn-primary">
        <BsArrowLeft />
      </Link>
      <h1 className="text-center mb-4">Editar Evento</h1>
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
          {editedEvent && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <b>Título:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={editedEvent.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <b>Descrição:</b>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={editedEvent.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>
                  <b>Data de Início:</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="startsDate"
                  value={editedEvent.startsDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <b>Data de Término:</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="endsDate"
                  value={editedEvent.endsDate}
                  onChange={handleChange}
                  required
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Salvar Alterações
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeEvents;
