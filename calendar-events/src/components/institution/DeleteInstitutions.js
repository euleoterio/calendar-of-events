import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

function DeleteInstitutions() {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

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

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution);
  };

  const handleDeleteInstitution = async () => {
    if (!selectedInstitution) return;
    try {
      await api.delete(`/institutions/${selectedInstitution.id}`);
      await fetchInstitutions();
      setSelectedInstitution(null);
      toast.success("Instituição deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar a instituição:", error);
      if (error.response && error.response.data) {
        toast.error(`Erro ao deletar a instituição: ${error.response.data}`);
      } else {
        toast.error(
          "Erro ao deletar a instituição. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  const handleCancel = () => {
    setSelectedInstitution(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Deletar Instituição</h1>
      <div className="row">
        <div className="col-md-4">
          <h4>Selecionar Instituição</h4>
          <ul className="list-group">
            {institutions.map((institution) => (
              <li
                key={institution.id}
                className={`list-group-item ${
                  selectedInstitution &&
                  institution.id === selectedInstitution.id
                    ? "active"
                    : ""
                }`}
                onClick={() => handleSelectInstitution(institution)}
                style={{ cursor: "pointer" }}
              >
                {institution.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          {selectedInstitution && (
            <div className="institution-container shadow rounded mt-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">
                  <b>Detalhes da Instituição</b>
                </h3>
                <p className="card-text">
                  <b>Nome:</b> {selectedInstitution.name}
                </p>
                <p className="card-text">
                  <b>Tipo:</b> {selectedInstitution.type}
                </p>
                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-danger me-3"
                    onClick={handleDeleteInstitution}
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
        to="/institutions"
        className="btn btn-primary position-absolute top-0 start-0 m-3"
      >
        <BsArrowLeft />
      </Link>
    </div>
  );
}

export default DeleteInstitutions;
