import React from "react";
import { Link } from "react-router-dom";

function Institutions() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Instituições</h1>
      <p className="text-center mb-4 fs-5">
        Você pode ver todas as instituições, cadastrar uma nova, alterar uma já
        existente ou até mesmo deletar!
        <br />
        Escolha uma opção abaixo:
      </p>
      <div className="d-flex justify-content-center">
        <Link to="/" className="btn btn-primary btn-lg me-3">
          Início
        </Link>
        <Link to="/institutions/view" className="btn btn-primary btn-lg me-3">
          Consultar Instituições
        </Link>
        <Link to="/institutions/create" className="btn btn-primary btn-lg me-3">
          Cadastrar Instituição
        </Link>
        <Link to="/institutions/change" className="btn btn-primary btn-lg me-3">
          Alterar Instituição
        </Link>
        <Link to="/institutions/delete" className="btn btn-primary btn-lg me-3">
          Deletar Instituição
        </Link>
      </div>
    </div>
  );
}

export default Institutions;
