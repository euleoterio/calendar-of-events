import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-4">
      <div className="text-center">
        <h1 className="mb-4">Calendário de Eventos</h1>
        <p className="fs-5 mb-4">
          Bem-vindo ao Calendário de Eventos, aqui você pode visualizar e
          gerenciar eventos importantes. <br /> Selecione uma das opções abaixo
          para começar:
        </p>
        <div className="button-container">
          <Link to="/events" className="btn btn-primary btn-lg me-3">
            Ver Eventos
          </Link>
          <Link to="/institutions" className="btn btn-primary btn-lg">
            Ver Instituições
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
