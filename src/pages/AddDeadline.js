import React, { useState, useEffect } from "react";
import "../styles/AddDeadline.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faChartLine,
  faRightFromBracket,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import it from "date-fns/locale/it";
import { getLoggedUser, logoutAndRedirect } from "../helpers/authHelper";
registerLocale("it", it);

// Componente custom per l'input della data
const CustomDateInput = React.forwardRef(({ value }, ref) => (
  <input
    ref={ref}
    value={value || ""}
    readOnly
    className="custom-date-picker"
    placeholder="GG-MM-AAAA"
  />
));

function Sidebar({ user }) {
  return (
    <aside className="sidebar">
      <Link to={"/dashboard"} className="logo">
        <span>Home</span>Cloud
      </Link>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <Link to="/add-deadline">
              <FontAwesomeIcon icon={faCalendarPlus} className="icon" />
              <span>Aggiungi Scadenza</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faChartLine} className="icon" />
              <span>Dashboard</span>
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
        <button className="logout-button" onClick={logoutAndRedirect}>
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

const AddDeadline = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    type: "",
    notifications_on: false,
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [user, setUser] = useState({
    full_name: "Nome Utente",
    email: "email@example.com",
  });

  // Stato per messaggi e caricamento
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. Ottieni l'utente loggato da Cognito
        const cognitoUser = await getLoggedUser();
        if (!cognitoUser) throw new Error("Utente non autenticato");

        // 2. Recupera tutti gli utenti dal backend
        const usersResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        // 3. Trova l'utente nel backend tramite email
        const currentUser = usersResponse.data.find(
          (u) => u.email === cognitoUser.username
        );
        if (!currentUser) throw new Error("Utente non trovato nel backend");
        setUser(currentUser);
      } catch (error) {
        setUser({
          full_name: "Nome Utente",
          email: "email@example.com",
        });
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Aggiorna la data nel form quando selectedDate cambia
  useEffect(() => {
    if (selectedDate) {
      setForm((prev) => ({
        ...prev,
        due_date: selectedDate.toISOString().split("T")[0],
      }));
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Format due_date as YYYY-MM-DDTHH
      let dueDateFormatted = "";
      if (selectedDate) {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const hours = String(selectedDate.getHours()).padStart(2, "0");
        dueDateFormatted = `${year}-${month}-${day}T${hours}`;
      }

      const deadlineData = {
        ...form,
        due_date: dueDateFormatted,
        user_id: user.id, // usa id reale
      };

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/deadlines`,
        deadlineData
      );

      setMessage({
        type: "success",
        text: "Scadenza aggiunta con successo!",
      });

      setForm({
        title: "",
        description: "",
        due_date: "",
        type: "",
        notifications_on: false,
      });
      setSelectedDate(null);

      // Mostra il messaggio per 1 secondo, poi reindirizza
      setTimeout(() => {
        setMessage(null);
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Errore durante l'aggiunta della scadenza.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container deadline-details-container">
      <Sidebar user={user} />
      <main className="adddeadline main-content">
        <section>
          <h1 className="section-title">Aggiungi Scadenza</h1>
          <form className="add-deadline-form" onSubmit={handleSubmit}>
            <label>
              <p>Titolo:</p>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={255}
                placeholder="Titolo della scadenza"
                disabled={isSubmitting}
              />
            </label>
            <label>
              <p>Descrizione:</p>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                maxLength={255}
                placeholder="Descrizione dettagliata"
                disabled={isSubmitting}
              />
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
                  calendarStartDay={1}
                  minDate={new Date()}
                  open={isCalendarOpen}
                  onClickOutside={() => setIsCalendarOpen(false)}
                  customInput={<CustomDateInput />}
                  dayClassName={(date) =>
                    date.toDateString() === selectedDate?.toDateString()
                      ? "custom-selected-day"
                      : undefined
                  }
                  disabled={isSubmitting}
                />
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="calendar-icon"
                  onClick={() => setIsCalendarOpen((prev) => !prev)}
                />
              </div>
            </label>
            <label>
              <p>Categoria:</p>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="">Seleziona una categoria</option>
                <option value="Casa">Casa</option>
                <option value="Lavoro">Lavoro</option>
                <option value="Salute">Salute</option>
                <option value="Garage">Garage</option>
                <option value="Documenti">Documenti</option>
                <option value="Personale">Personale</option>
                <option value="Altro">Altro</option>
              </select>
            </label>
            <label className="notifications-checkbox">
              <input
                type="checkbox"
                name="notifications_on"
                checked={form.notifications_on}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              Attiva notifica
            </label>
            <button
              type="submit"
              className="save-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Aggiungendo..." : "Aggiungi Scadenza"}
            </button>
          </form>
          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AddDeadline;
