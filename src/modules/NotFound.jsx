import React from "react";
import "../styles/NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Ups... Página no encontrada</p>
        <p className="notfound-text">
          La URL ingresada no existe. Por favor, verifica la URL y vuelve a intentarlo.
        </p>
        <button style={confirmButtonStyle}>
          <Link to="/home" style={{ textDecoration: 'none', color: '#fff' }}>
            Ir al inicio
          </Link>
        </button>
      </div>
    </div>
  );
};

const confirmButtonStyle = {
  backgroundColor: "#4ca996",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
  fontSize: "14px",
  marginLeft: '10px',
}

export default NotFound;