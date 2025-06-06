import React, { useState, useEffect } from "react";
import "../styles/AddDeadline.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faChartLine,
  faRightFromBracket,
  faCalendarDay,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
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

function Sidebar({ user, userLoading }) {
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
          {userLoading ? (
            <div className="skeleton skeleton-avatar"></div>
          ) : user?.profileImageUrl ? (
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
          {userLoading ? (
            <>
              <div className="skeleton skeleton-name"></div>
              <div className="skeleton skeleton-email"></div>
            </>
          ) : (
            <>
              <div className="name">{user?.full_name || "Nome Utente"}</div>
              <div className="email">{user?.email || "email@example.com"}</div>
            </>
          )}
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
  const navigate = useNavigate();

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
  const [userLoading, setUserLoading] = useState(true);

  // Stato per messaggi e caricamento
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const typeOptions = [
    "Casa",
    "Lavoro",
    "Salute",
    "Garage",
    "Documenti",
    "Personale",
    "Altro",
  ];

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
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
      } catch (error) {
        setUser({
          full_name: "Nome Utente",
          email: "email@example.com",
        });
      } finally {
        setUserLoading(false);
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

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setTypeDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Rimuovi spazi inizio/fine
    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();

    // Validazione frontend
    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !selectedType ||
      !selectedDate
    ) {
      setMessage({
        type: "error",
        text: "Compila tutti i campi obbligatori.",
      });
      return;
    }

    setIsSubmitting(true);

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
        title: trimmedTitle,
        description: trimmedDescription,
        due_date: dueDateFormatted,
        type: selectedType,
        notifications_on: !!isNotificationOn,
        user_id: user.id,
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
      setSelectedType("");
      setIsNotificationOn(false);

      setTimeout(() => {
        setMessage(null);
        navigate("/dashboard");
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
      <Sidebar user={user} userLoading={userLoading} />
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
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
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
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                required
                maxLength={255}
                placeholder="Descrizione dettagliata"
                disabled={isSubmitting}
              />
            </label>
            <label className="type-input-container">
              <p>Categoria:</p>
              <div
                className={`custom-type-dropdown${
                  typeDropdownOpen ? " open" : ""
                }`}
                tabIndex={0}
                onBlur={() => setTimeout(() => setTypeDropdownOpen(false), 100)}
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
                  disabled={isSubmitting}
                />
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  className="calendar-icon"
                  onClick={() => setIsCalendarOpen((prev) => !prev)}
                />
              </div>
            </label>
            <label className="add-deadline-notifications-input-container">
              <p>Notifica:</p>
              <div className="notification-toggle">
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="notification-checkbox"
                    checked={isNotificationOn}
                    onChange={(e) => setIsNotificationOn(e.target.checked)}
                    disabled={isSubmitting}
                  />
                  {isNotificationOn ? (
                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                  ) : null}
                </div>
                <span>{isNotificationOn ? "Attiva" : "Disattiva"}</span>
              </div>
            </label>

            <button
              type="submit"
              className="save-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Aggiungendo..." : "Aggiungi Scadenza"}
            </button>
            {message && (
              <div className={`message ${message.type}`}>{message.text}</div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddDeadline;
