import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import "./Institution.css";
import api from "../../services/api";

function CreateInstitutions() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [createdInstitution, setCreatedInstitution] = useState(null);
  const [redirectToInstitutions, setRedirectToInstitutions] = useState(false);
  const [institutionTypes, setInstitutionTypes] = useState([]);

  useEffect(() => {
    fetchInstitutionTypes();
  }, []);

  const fetchInstitutionTypes = async () => {
    try {
      const response = await api.get("/enums/institutionType");
      setInstitutionTypes(response.data);
    } catch (error) {
      console.error("Erro ao buscar os tipos de instituição:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/institutions", {
        name,
        type,
      });

      setCreatedInstitution(response.data);
      setRedirectToInstitutions(true);
      toast.success("Instituição criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar a instituição:", error);
      if (error.response && error.response.data) {
        toast.error(`Erro ao criar a instituição: ${error.response.data}`);
      } else {
        toast.error(
          "Erro ao criar a instituição. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  if (redirectToInstitutions && createdInstitution) {
    return (
      <div className="container mt-4">
        <Link
          to="/institutions"
          className="btn btn-primary position-absolute top-0 start-0 m-3"
        >
          <BsArrowLeft />
        </Link>
        <h1 className="card-title text-center mb-4">Instituição Criada</h1>
        <div className="institution-container shadow rounded">
          <h4 className="card-text">
            <b>Nome:</b> {createdInstitution.name}
          </h4>
          <p className="card-text">
            <b>Tipo:</b> {createdInstitution.type}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Criar Instituição</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nome:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Tipo:</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Selecione o tipo</option>
            {institutionTypes.map((instType, index) => (
              <option key={index} value={instType}>
                {instType}
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
        to="/institutions"
        className="btn btn-primary btn-lg position-fixed top-0 start-0 m-3"
      >
        <BsArrowLeft />
      </Link>
    </div>
  );
}

export default CreateInstitutions;
