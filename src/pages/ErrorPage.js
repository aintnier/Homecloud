import React from "react";
import { Link } from "react-router-dom";
import "../styles/ErrorPage.css";
import FuzzyText from "../components/FuzzyText/FuzzyText.jsx";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.4}
        enableHover={true}
        fontWeight={900}
        color="#ffffff"
      >
        404
      </FuzzyText>
      <p>Oops! La pagina che stai cercando non esiste.</p>
      <Link to="/" className="back-button">
        Torna alla Home
      </Link>
    </div>
  );
};

export default ErrorPage;
