import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/DeadlineDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faHeart,
  faHome,
  faFileAlt,
  faExclamationTriangle,
  faCalendarCheck,
  faUser,
  faArrowLeft,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function DeadlineDetails() {
  const { id } = useParams();
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const typeIcons = {
    Salute: faHeart,
    Garage: faCar,
    Casa: faHome,
    Documenti: faFileAlt,
    Altro: faExclamationTriangle,
    Lavoro: faCalendarCheck,
    Personale: faUser,
  };

  useEffect(() => {
    const fetchDeadlineDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/deadlines`
        );

        const selectedDeadline = response.data.find(
          (deadline) => deadline.id === parseInt(id, 10)
        );

        if (!selectedDeadline) {
          throw new Error("Scadenza non trovata");
        }

        setDeadline(selectedDeadline);
        setLoading(false);
      } catch (err) {
        console.error("Errore durante il recupero dei dettagli:", err);
        setError("Impossibile caricare i dettagli della scadenza.");
        setLoading(false);
      }
    };

    fetchDeadlineDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("it-IT", options);
  };

  if (loading) {
    return (
      <div className="deadline-details-container">
        {/* Sidebar (same as Dashboard) */}
        <aside className="sidebar">
          <Link to={"/dashboard"} className="logo">
            <span>Home</span>Cloud
          </Link>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/dashboard">
                  <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <a href="/add-deadline">
                  <FontAwesomeIcon icon={faCalendarCheck} className="icon" />
                  <span>Aggiungi Scadenza</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* User Profile and Logout (same as Dashboard) */}
          <a href="/profile" className="user-profile">
            <div className="avatar"></div>
            <div className="user-info">
              <div className="name">Nome Utente</div>
              <div className="email">email@example.com</div>
            </div>
          </a>
          <nav className="sidebar-bottom-nav">
            <button className="logout-button" onClick={() => alert("Logout")}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="icon logout-icon"
              />
              <span>Logout</span>
            </button>
          </nav>
        </aside>
        <main className="main-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="deadline-details-container">
        {/* Sidebar (same as Dashboard) */}
        <aside className="sidebar">
          <Link to={"/dashboard"} className="logo">
            <span>Home</span>Cloud
          </Link>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/dashboard">
                  <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <a href="/add-deadline">
                  <FontAwesomeIcon icon={faCalendarCheck} className="icon" />
                  <span>Aggiungi Scadenza</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* User Profile and Logout (same as Dashboard) */}
          <a href="/profile" className="user-profile">
            <div className="avatar"></div>
            <div className="user-info">
              <div className="name">Nome Utente</div>
              <div className="email">email@example.com</div>
            </div>
          </a>
          <nav className="sidebar-bottom-nav">
            <button className="logout-button" onClick={() => alert("Logout")}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="icon logout-icon"
              />
              <span>Logout</span>
            </button>
          </nav>
        </aside>
        <main className="main-content">
          <div className="error-message">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="deadline-details-container">
      {/* Sidebar (same as Dashboard) */}
      <aside className="sidebar">
        <Link to={"/dashboard"} className="logo">
          <span>Home</span>Cloud
        </Link>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <a href="/add-deadline">
                <FontAwesomeIcon icon={faCalendarCheck} className="icon" />
                <span>Aggiungi Scadenza</span>
              </a>
            </li>
          </ul>
        </nav>
        {/* User Profile and Logout (same as Dashboard) */}
        <a href="/profile" className="user-profile">
          <div className="avatar"></div>
          <div className="user-info">
            <div className="name">Nome Utente</div>
            <div className="email">email@example.com</div>
          </div>
        </a>
        <nav className="sidebar-bottom-nav">
          <button className="logout-button" onClick={() => alert("Logout")}>
            <FontAwesomeIcon icon={faArrowLeft} className="icon logout-icon" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <div className="details-header">
          <h1>Dettagli Scadenza</h1>

          <div className="actions">
            <button className="edit-button">
              <FontAwesomeIcon icon={faEdit} className="icon" /> Modifica
            </button>
            <button className="delete-button">
              <FontAwesomeIcon icon={faTrashAlt} className="icon" /> Elimina
            </button>
          </div>
        </div>

        <div className="details-card">
          <div className="card-actions">
            {" "}
            {/* Nuovo contenitore per i bottoni nella card */}
            <button className="edit-button">
              <FontAwesomeIcon icon={faEdit} className="icon" /> Modifica
            </button>
            <button className="delete-button">
              <FontAwesomeIcon icon={faTrashAlt} className="icon" /> Elimina
            </button>
          </div>
          <h2>
            <FontAwesomeIcon
              icon={typeIcons[deadline?.type] || faExclamationTriangle}
              className="deadline-icon"
            />
            {deadline?.title}
          </h2>
          <div className="detail-row">
            <span className="label">Categoria:</span>
            <span className="value">{deadline?.type}</span>
          </div>
          <div className="detail-row">
            <span className="label">Data:</span>
            <span className="value">
              {deadline && formatDate(deadline.due_date)}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">Descrizione:</span>
            <span className="value">{deadline?.description}</span>
          </div>
          <div className="detail-row">
            <span className="label">Notifica:</span>
            <span
              className={`value notification-${
                deadline?.notifications_on === 1 ? "on" : "off"
              }`}
            >
              {deadline?.notifications_on === 1 ? "On" : "Off"}
            </span>
          </div>
          {/* Puoi aggiungere qui altri dettagli se necessario */}
        </div>
      </main>
    </div>
  );
}

export default DeadlineDetails;
