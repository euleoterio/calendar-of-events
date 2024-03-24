import React from "react";
import "./Institution.css";

function InstitutionComponent({ institution }) {
  return (
    <div className="institution-container shadow rounded">
      <h5 className="institution-title">{institution.name}</h5>
      <p className="institution-type">
        <strong>Tipo:</strong> {institution.type}
      </p>
    </div>
  );
}

export default InstitutionComponent;