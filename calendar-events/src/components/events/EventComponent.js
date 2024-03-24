import React from "react";
import "./Event.css";
function EventComponent({ event }) {
  return (
    <div className="event-container shadow rounded">
      <h5 className="event-title">{event.title}</h5>
      <p className="event-description">
        <strong>Descrição: </strong>
        {event.description}
      </p>
      <p className="event-info">
        <strong>Início:</strong> {event.startsDate}
      </p>
      <p className="event-info">
        <strong>Fim:</strong> {event.endsDate}
      </p>
      <p className="event-status">
        <strong>Status:</strong> {event.status ? "ATIVO" : "INATIVO"}
      </p>
      <p className="event-institution">
        <strong>Instituição:</strong> {event.institution.name}
      </p>
      <p className="event-institution">
        <strong>Tipo:</strong> {event.institution.type}
      </p>
    </div>
  );
}

export default EventComponent;
