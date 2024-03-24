import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import InstitutionComponent from "./InstitutionComponent";
import { BsArrowLeft } from "react-icons/bs";

function ViewInstitutions() {
  const [institutions, setInstitutions] = useState([]);

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

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <Link to="/institutions" className="btn btn-primary">
            <BsArrowLeft />
          </Link>
        </div>
      </div>
      <h1 className="text-center mb-4">Visualização de Instituições</h1>
      <div className="row mt-4">
        {institutions.map((institution) => (
          <div key={institution.id} className="col-md-4 mb-4">
            <InstitutionComponent institution={institution} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewInstitutions;
