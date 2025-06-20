import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DeadlineDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCalendarPlus,
  faCalendarDay,
  faRightFromBracket,
  faPen,
  faTrash,
  faCheck,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getLoggedUser, logoutAndRedirect } from "../helpers/authHelper";
import Sidebar from "../components/Sidebar";

registerLocale("it", it);

const CustomDateInput = React.forwardRef(({ value }, ref) => (
  <input
    ref={ref}
    value={value || ""}
    readOnly
    className="custom-date-picker"
    placeholder="GG-MM-AAAA"
    tabIndex={-1}
  />
));

function DeadlineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState(null);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(deadline?.type || "");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const typeOptions = [
    "Casa",
    "Lavoro",
    "Salute",
    "Garage",
    "Documenti",
    "Personale",
    "Altro",
  ];

  useEffect(() => {
    const fetchUserAndDeadlines = async () => {
      try {
        const cognitoUser = await getLoggedUser();
        if (!cognitoUser) throw new Error("Utente non autenticato");

        const usersResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        const currentUser = usersResponse.data.find(
          (u) => u.email === cognitoUser.username
        );
        if (!currentUser) throw new Error("Utente non trovato nel backend");
        setUser(currentUser);

        const deadlinesResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/deadlines`
        );
        const selectedDeadline = deadlinesResponse.data.find(
          (deadline) =>
            deadline.id === parseInt(id, 10) &&
            deadline.user_id === currentUser.id
        );
        if (!selectedDeadline) {
          throw new Error("Scadenza non trovata");
        }
        setDeadline(selectedDeadline);
        setLoading(false);
      } catch (err) {
        setError("Impossibile caricare i dettagli della scadenza.");
        setLoading(false);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserAndDeadlines();
  }, [id]);

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
      setIsNotificationOn(deadline.notifications_on);
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

  useEffect(() => {
    if (isEditModalOpen && deadline) {
      setEditTitle(deadline.title || "");
      setEditDescription(deadline.description || "");
    }
  }, [isEditModalOpen, deadline]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("it-IT", options);
  };

  const bottomNav = (
    <button className="logout-button" onClick={logoutAndRedirect}>
      <FontAwesomeIcon icon={faRightFromBracket} className="icon logout-icon" />
      <span>Logout</span>
    </button>
  );

  if (loading) {
    return (
      <div className="deadline-details-container">
        <Sidebar user={user} loadingUser={userLoading} bottomNav={bottomNav} />
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
        <Sidebar user={user} loadingUser={userLoading} bottomNav={bottomNav} />
        <main className="main-content">
          <div className="error-message">{error}</div>
        </main>
      </div>
    );
  }

  const handleEditClick = () => {
    setIsNotificationOn(deadline.notifications_on);
    setSelectedType(deadline.type || "");
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const trimmedTitle = editTitle.trim();
    const trimmedDescription = editDescription.trim();

    if (!trimmedTitle || !selectedType || !selectedDate) {
      setMessage({ type: "error", text: "Compila tutti i campi obbligatori." });
      return;
    }

    try {
      setIsUpdating(true);

      const updatedDeadline = {
        id: deadline.id,
        title: trimmedTitle,
        description: trimmedDescription,
        type: selectedType,
        due_date: selectedDate.toISOString().slice(0, 13),
        notifications_on: !!isNotificationOn,
        user_id: deadline.user_id,
      };

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/deadlines`,
        updatedDeadline
      );

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
      setMessage({
        type: "error",
        text: "Si è verificato un errore durante l'aggiornamento.",
      });
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deadlines`, {
        data: { id: deadline.id },
      });

      setMessage({
        type: "success",
        text: "Scadenza eliminata con successo!",
      });

      setIsDeleteModalOpen(false);

      setTimeout(() => {
        setMessage(null);
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Si è verificato un errore durante l'eliminazione.",
      });
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setTypeDropdownOpen(false);
  };

  const menuItems = [
    {
      label: "Dettagli Scadenza",
      path: `/deadline-details/${id}`,
      icon: faCalendarDay,
    },
    { label: "Dashboard", path: "/dashboard", icon: faChartLine },
    { label: "Aggiungi Scadenza", path: "/add-deadline", icon: faCalendarPlus },
  ];

  return (
    <div className="deadline-details-container">
      <Sidebar
        menuItems={menuItems}
        user={user}
        loadingUser={userLoading}
        activePath={`/deadline-details/${id}`}
        bottomNav={bottomNav}
      />
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
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </label>

              <label className="description-input-container">
                <p>Descrizione:</p>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                ></textarea>
              </label>

              <label className="type-input-container">
                <p>Categoria:</p>
                <div
                  className={`custom-type-dropdown${
                    typeDropdownOpen ? " open" : ""
                  }`}
                  tabIndex={0}
                  onBlur={() =>
                    setTimeout(() => setTypeDropdownOpen(false), 100)
                  }
                >
                  <div
                    className={`dropdown-selected${
                      typeDropdownOpen ? " open" : ""
                    }`}
                    onClick={() => setTypeDropdownOpen((open) => !open)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setTypeDropdownOpen((open) => !open);
                      if (e.key === "Escape") setTypeDropdownOpen(false);
                    }}
                  >
                    <p className="type-selected-placeholder">
                      {selectedType || "Seleziona una categoria"}
                    </p>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="dropdown-arrow"
                    />
                  </div>
                  {typeDropdownOpen && (
                    <div className="dropdown-options" role="listbox">
                      {typeOptions.map((option) => (
                        <div
                          key={option}
                          className={`dropdown-option${
                            selectedType === option ? " selected" : ""
                          }`}
                          onClick={() => handleTypeSelect(option)}
                          tabIndex={0}
                          role="option"
                          aria-selected={selectedType === option}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              handleTypeSelect(option);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>
              {/* --- FINE CAMPO TIPOLOGIA --- */}

              <label className="date-input-container">
                <p>Data di Scadenza:</p>
                <div
                  className="custom-date-input"
                  tabIndex={-1}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setIsCalendarOpen(false);
                  }}
                >
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
                    customInput={<CustomDateInput />}
                    disabled={isUpdating /* o isSubmitting in AddDeadline */}
                  />
                  <FontAwesomeIcon
                    icon={faCalendarDay /* o faCalendar in AddDeadline */}
                    className="calendar-icon"
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                  />
                </div>
              </label>

              <label className="deadlines-details-notifications-input-container">
                <p>Notifica:</p>
                <div className="notification-toggle">
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      id="notification-checkbox"
                      checked={isNotificationOn}
                      onChange={(e) => setIsNotificationOn(e.target.checked)}
                    />
                    {isNotificationOn ? (
                      <FontAwesomeIcon icon={faCheck} className="check-icon" />
                    ) : null}
                  </div>
                  <span>{isNotificationOn ? "Attiva" : "Disattiva"}</span>
                </div>
              </label>

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
