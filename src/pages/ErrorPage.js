import React from "react";
import { Link } from "react-router-dom";
import "../styles/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-title">404</h1>
      <p>Oops! La pagina che stai cercando non esiste.</p>
      <Link to="/" className="back-button">
        Torna alla Home
      </Link>
    </div>
  );
};

export default ErrorPage;
