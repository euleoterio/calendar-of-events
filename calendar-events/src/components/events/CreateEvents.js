import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import "./Event.css";
import api from "../../services/api";

function CreateEvents() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [institutionId, setInstitutionId] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [createdEvent, setCreatedEvent] = useState(null);
  const [redirectToEvents, setRedirectToEvents] = useState(false);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await api.get("/institutions");
      setInstitutions(response.data);
    } catch (error) {
      console.error("Erro ao buscar as instituições:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/events", {
        title,
        description,
        startsDate: startDate,
        endsDate: endDate,
        institution: {
          id: institutionId,
        },
      });

      await fetchEventAndInstitution(response.data.id);
      setRedirectToEvents(true);
      toast.success("Evento criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o evento:", error);
      if (error.response && error.response.data) {
        toast.error(`Erro ao criar o evento: ${error.response.data}`);
      } else {
        toast.error(
          "Erro ao criar o evento. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  const fetchEventAndInstitution = async (eventId) => {
    try {
      const eventResponse = await api.get(`/events/${eventId}`);
      const event = eventResponse.data;
      const institutionResponse = await api.get(
        `/institutions/${event.institution.id}`
      );
      const institution = institutionResponse.data;
      setCreatedEvent({
        ...event,
        institution: institution.name,
      });
    } catch (error) {
      console.error("Erro ao buscar o evento e a instituição:", error);
    }
  };

  if (redirectToEvents && createdEvent) {
    return (
      <div className="container mt-4">
        <Link
          to="/events"
          className="btn btn-primary position-absolute top-0 start-0 m-3"
        >
          <BsArrowLeft />
        </Link>
        <h1 className="card-title text-center mb-4">Evento Criado</h1>
        <div className="event-container shadow rounded">
          <h3 className="card-text">
            <b>Título:</b> {createdEvent.title}
          </h3>
          <p className="card-text">
            <b>Descrição:</b> {createdEvent.description}
          </p>
          <p className="card-text">
            <b>Data de Início:</b> {createdEvent.startsDate}
          </p>
          <p className="card-text">
            <b>Data de Término:</b> {createdEvent.endsDate}
          </p>
          <p className="card-text">
            <b>Status:</b> {createdEvent.status ? "Ativo" : "Inativo"}
          </p>
          <p className="card-text">
            <b>Instituição:</b> {createdEvent.institution}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Criar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Título:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Descrição:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Data de Início:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Data de Término:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Instituição:</label>
          <select
            className="form-select"
            value={institutionId}
            onChange={(e) => setInstitutionId(e.target.value)}
            required
          >
            <option value="">Selecione a instituição</option>
            {institutions.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-end">
          <button type="submit" className="btn btn-primary btn-lg me-2">
            Criar
          </button>
        </div>
      </form>
      <Link
        to="/events"
        className="btn btn-primary btn-lg position-fixed top-0 start-0 m-3"
      >
        <BsArrowLeft />
      </Link>
    </div>
  );
}

export default CreateEvents;
