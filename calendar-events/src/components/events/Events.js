import React from "react";
import { Link } from "react-router-dom";

function Events() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Eventos</h1>
      <p className="text-center mb-4 fs-5">
        Você pode ver todos os eventos, cadastrar um novo, alterar um já
        existente ou até mesmo deletar!
        <br />
        Escolha uma opção abaixo:
      </p>
      <div className="d-flex justify-content-center">
        <Link to="/" className="btn btn-primary btn-lg me-3">
          Início
        </Link>
        <Link to="/events/view" className="btn btn-primary btn-lg me-3">
          Consultar Eventos
        </Link>
        <Link to="/events/create" className="btn btn-primary btn-lg me-3">
          Cadastrar Eventos
        </Link>
        <Link to="/events/change" className="btn btn-primary btn-lg me-3">
          Alterar Eventos
        </Link>
        <Link to="/events/delete" className="btn btn-primary btn-lg me-3">
          Deletar Eventos
        </Link>
      </div>
    </div>
  );
}

export default Events;
