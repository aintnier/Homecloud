import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/DeadlineDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCalendarDay,
  faCalendarPlus,
  faRightFromBracket,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Sidebar({ user }) {
  return (
    <aside className="sidebar">
      <Link to={"/dashboard"} className="logo">
        <span>Home</span>Cloud
      </Link>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <Link to={`/deadline-details/${user?.id || 1}`}>
              <FontAwesomeIcon icon={faCalendarDay} className="icon" />
              <span>Dettagli Scadenza</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faChartLine} className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/add-deadline">
              <FontAwesomeIcon icon={faCalendarPlus} className="icon" />
              <span>Aggiungi Scadenza</span>
            </Link>
          </li>
        </ul>
      </nav>
      <a href="/profile" className="user-profile">
        <div className="avatar"></div>
        <div className="user-info">
          <div className="name">{user?.full_name || "Nome Utente"}</div>
          <div className="email">{user?.email || "email@example.com"}</div>
        </div>
      </a>
      <nav className="sidebar-bottom-nav">
        <button className="logout-button" onClick={() => alert("Logout")}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="icon logout-icon"
          />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

function DeadlineDetails() {
  const { id } = useParams();
  const [deadline, setDeadline] = useState(null);
  const [user, setUser] = useState(null); // Stato per l'utente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 1; // ID utente simulato // TEMPORANEO!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    const fetchUserAndDeadline = async () => {
      try {
        // Recupera tutti gli utenti
        const usersResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/users`
        );

        // Filtra l'utente con ID corrispondente a userId
        const currentUser = usersResponse.data.find(
          (user) => user.id === userId
        );
        if (!currentUser) {
          throw new Error(`Utente con ID ${userId} non trovato`);
        }
        setUser(currentUser);

        // Recupera tutte le scadenze
        const deadlinesResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/deadlines`
        );

        // Trova la scadenza selezionata
        const selectedDeadline = deadlinesResponse.data.find(
          (deadline) => deadline.id === parseInt(id, 10)
        );

        if (!selectedDeadline) {
          throw new Error("Scadenza non trovata");
        }

        setDeadline(selectedDeadline);
        setLoading(false);
      } catch (err) {
        console.error("Errore durante il recupero dei dati:", err);
        setError("Impossibile caricare i dettagli della scadenza.");
        setLoading(false);
      }
    };

    fetchUserAndDeadline();
  }, [id, userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("it-IT", options);
  };

  if (loading) {
    return (
      <div className="deadline-details-container">
        <Sidebar user={user} />
        <main className="main-content loading">
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
        <Sidebar user={user} />
        <main className="main-content">
          <div className="error-message">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="deadline-details-container">
      <Sidebar user={user} />
      <main className="main-content">
        <header className="details-header">
          <h1>Dettagli Scadenza</h1>
        </header>
        <div className="details-card">
          <div className="details-card-header">
            <h2>{deadline?.title}</h2>

            <div className="actions">
              <button onClick={() => alert("Modifica")} className="edit-button">
                <FontAwesomeIcon icon={faPen} className="icon" />
                Modifica
              </button>
              <button
                onClick={() => alert("Elimina")}
                className="delete-button"
              >
                <FontAwesomeIcon icon={faTrash} className="icon" />
                Elimina
              </button>
            </div>
          </div>

          <div className="details-content">
            <div className="details-container type-container">
              <p>Categoria</p>
              <p
                className={`deadline-type ${deadline.type
                  .toLowerCase()
                  .replace(" ", "-")}-type`}
              >
                {deadline?.type}
              </p>
            </div>

            <div className="details-container date-container">
              <p>Data di Scadenza</p>
              <p className="deadline-date">
                {deadline && formatDate(deadline.due_date)}
              </p>
            </div>

            <div className="details-container description-container">
              <p>Descrizione</p>
              <p className="deadline-description">{deadline?.description}</p>
            </div>

            <div className="details-container notification-container">
              <p>Notifica</p>
              <p className="deadline-notification">
                {deadline?.notifications_on ? "On" : "Off"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DeadlineDetails;
