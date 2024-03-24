import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import api from "../../services/api";

function ChangeInstitutions() {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [editedInstitution, setEditedInstitution] = useState(null);
  const [institutionTypes, setInstitutionTypes] = useState([]);

  useEffect(() => {
    fetchInstitutions();
    fetchInstitutionTypes();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await api.get("/institutions");
      setInstitutions(response.data);
    } catch (error) {
      console.error("Erro ao buscar as instituições:", error);
    }
  };

  const fetchInstitutionTypes = async () => {
    try {
      const response = await api.get("/enums/institutionType");
      setInstitutionTypes(response.data);
    } catch (error) {
      console.error("Erro ao buscar os tipos de instituição:", error);
    }
  };

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution);
    setEditedInstitution({ ...institution });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInstitution((prevInstitution) => ({
      ...prevInstitution,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { id, name, type } = editedInstitution;
      await api.put(`/institutions/${id}`, {
        name,
        type,
      });
      fetchInstitutions();
      setEditedInstitution(null);
      toast.success("As alterações foram salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao editar a instituição:", error);
      if (error.response && error.response.data) {
        toast.error(`Erro ao editar a instituição: ${error.response.data}`);
      } else {
        toast.error(
          "Erro ao editar a instituição. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/institutions" className="btn btn-primary">
        <BsArrowLeft />
      </Link>
      <h1 className="text-center mb-4">Editar Instituição</h1>
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
          {editedInstitution && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <b>Nome:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editedInstitution.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <b>Tipo:</b>
                </label>
                <select
                  className="form-control"
                  name="type"
                  value={editedInstitution.type}
                  onChange={handleChange}
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
                <button type="submit" className="btn btn-primary">
                  {" "}
                  Salvar Alterações{" "}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeInstitutions;
