import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";
import "react-datepicker/dist/react-datepicker.css";
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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

registerLocale("it", it);

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
        <div className="avatar">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Avatar"
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder"></div>
          )}
        </div>
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Stato per il caricamento durante l'aggiornamento
  const [message, setMessage] = useState(null);
  const [isNotificationOn, setIsNotificationOn] = useState(false); // Stato locale per il checkbox

  const userId = 1; // ID utente simulato // TEMPORANEO!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    const fetchUserAndDeadline = async () => {
      try {
        // Recupera tutti gli utenti
        const usersResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users`
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
          `${process.env.REACT_APP_BACKEND_URL}/deadlines`
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

  useEffect(() => {
    if (deadline) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const dueDate = new Date(deadline.due_date);
        const creationDate = new Date(deadline.creation_date);
        const totalDuration = dueDate - creationDate;
        const timeElapsed = now - creationDate;
        const difference = dueDate - now;

        if (difference <= 0) {
          setTimeLeft("Scaduto");
          setProgress(100);
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(
          `${days} giorni, ${hours} ore, ${minutes} minuti, ${seconds} secondi`
        );

        const progressPercentage = Math.min(
          (timeElapsed / totalDuration) * 100,
          100
        );
        setProgress(progressPercentage);
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
  }, [deadline]);

  useEffect(() => {
    if (deadline) {
      setSelectedDate(new Date(deadline.due_date));
      setIsNotificationOn(deadline.notifications_on); // Inizializza lo stato locale
    }
  }, [deadline]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

  const handleEditClick = () => {
    setIsNotificationOn(deadline.notifications_on); // Reimposta lo stato del checkbox con il valore effettivo della scadenza
    setIsEditModalOpen(true); // Mostra il modal
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false); // Nasconde il modal
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedDeadline = {
        id: deadline.id,
        title: e.target[0].value,
        description: e.target[1].value,
        due_date: selectedDate.toISOString().slice(0, 13),
        notifications_on: !!isNotificationOn,
        user_id: deadline.user_id,
        type: deadline.type,
      };

      setIsUpdating(true);

      console.log("Body inviato:", updatedDeadline);
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/deadlines`,
        updatedDeadline
      );

      // Dopo la risposta positiva dell'update, ricarica tutti i dati dal backend
      const refreshed = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/deadlines`
      );
      const updated = refreshed.data.find((d) => d.id === deadline.id);
      setDeadline(updated);

      setMessage({
        type: "success",
        text: "Scadenza aggiornata con successo!",
      });
      setIsUpdating(false);
      handleCloseModal();
    } catch (error) {
      console.error("Errore durante l'aggiornamento della scadenza:", error);
      setMessage({
        type: "error",
        text: "Si è verificato un errore durante l'aggiornamento.",
      });
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true); // Mostra il modal di conferma
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Nasconde il modal di conferma
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/deadlines/${deadline.id}`
      );

      setMessage({
        type: "success",
        text: "Scadenza eliminata con successo!",
      });

      setIsDeleteModalOpen(false);

      // Mostra il messaggio per 3 secondi, poi reindirizza alla dashboard
      setTimeout(() => {
        setMessage(null);
        window.location.href = "/dashboard";
      }, 3000);
    } catch (error) {
      console.error("Errore durante l'eliminazione della scadenza:", error);
      setMessage({
        type: "error",
        text: "Si è verificato un errore durante l'eliminazione.",
      });
    }
  };

  return (
    <div className="deadline-details-container">
      <Sidebar user={user} />
      <main className="main-content">
        <header className="details-header">
          <h1 className="section-title">Dettagli Scadenza</h1>
        </header>
        <div className="details-card">
          <div className="details-card-header">
            <h2>{deadline?.title}</h2>

            <div className="actions">
              <button onClick={handleEditClick} className="edit-button">
                <FontAwesomeIcon icon={faPen} className="icon" />
                Modifica
              </button>
              <button onClick={handleDeleteClick} className="delete-button">
                <FontAwesomeIcon icon={faTrash} className="icon" />
                Elimina
              </button>
            </div>
          </div>

          <div className="details-content">
            <div className="details-container type-container">
              <p>Categoria</p>
              <p
                className={`deadline-type ${
                  deadline?.type
                    ? deadline.type.toLowerCase().replace(" ", "-")
                    : ""
                }-type`}
              >
                {deadline?.type || "N/A"}
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

            <div className="details-container countdown-container">
              <p>Tempo Rimanente</p>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="deadline-countdown">{timeLeft}</p>
            </div>
          </div>
        </div>
      </main>
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Modifica Scadenza</h2>
            <form onSubmit={handleUpdate}>
              <label className="title-input-container">
                <p>Titolo:</p>
                <input type="text" defaultValue={deadline?.title} required />
              </label>

              <label className="description-input-container">
                <p>Descrizione:</p>
                <textarea
                  defaultValue={deadline?.description}
                  required
                ></textarea>
              </label>

              <label className="date-input-container">
                <p>Data di Scadenza:</p>
                <div className="custom-date-input">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }}
                    dateFormat="dd-MM-yyyy"
                    locale="it"
                    className="custom-date-picker"
                    calendarStartDay={1}
                    minDate={new Date()}
                    open={isCalendarOpen}
                    onClickOutside={() => setIsCalendarOpen(false)}
                    dayClassName={(date) =>
                      date.toDateString() === selectedDate?.toDateString()
                        ? "custom-selected-day"
                        : undefined
                    }
                  />
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className="calendar-icon"
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                  />
                </div>
              </label>

              <label className="notifications-input-container">
                <p>Notifica:</p>
              </label>
              <div className="notification-toggle">
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="notification-checkbox"
                    checked={isNotificationOn} // Usa lo stato locale
                    onChange={(e) => setIsNotificationOn(e.target.checked)} // Aggiorna lo stato locale
                  />
                  {isNotificationOn ? (
                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                  ) : null}
                </div>
                <span>{isNotificationOn ? "Attiva" : "Disattiva"}</span>
              </div>

              <div className="modal-actions">
                <button
                  type="submit"
                  className="save-button"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Salvando..." : "Salva"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCloseModal}
                  disabled={isUpdating}
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="confirmation-message">
              Sei sicuro di voler eliminare questa scadenza?
            </p>
            <div className="modal-actions" id="delete-modal-actions">
              <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
              >
                Elimina
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCloseDeleteModal}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
}

export default DeadlineDetails;
