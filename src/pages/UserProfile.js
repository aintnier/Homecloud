import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";
import { getLoggedUser, logoutAndRedirect } from "../helpers/authHelper";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCalendarPlus,
  faRightFromBracket,
  faUser,
  faCircleUser,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CountUp from "../components/CountUp/CountUp.jsx";
import GradientText from "../components/GradientText/GradientText.jsx";
import SplitText from "../components/SplitText/SplitText.jsx";
import Sidebar from "../components/Sidebar";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const notificationOptions = [
  { value: "1-day-before", label: "1 giorno prima" },
  { value: "1-week-before", label: "1 settimana prima" },
  { value: "2-weeks-before", label: "2 settimane prima" },
];

const menuItems = [
  { label: "Profilo Utente", path: "/profile", icon: faCircleUser },
  { label: "Dashboard", path: "/dashboard", icon: faChartLine },
  { label: "Aggiungi Scadenza", path: "/add-deadline", icon: faCalendarPlus },
];

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [deadlinesCount, setDeadlinesCount] = useState(0);
  const [selectedFrequency, setSelectedFrequency] = useState("1-week-before");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reminderChecked, setReminderChecked] = useState(false);
  const [updatingReminder, setUpdatingReminder] = useState(false);
  const [message, setMessage] = useState(null);

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
        setUser(currentUser);

        // Imposta lo stato del checkbox in base al valore nel DB
        setReminderChecked(!!currentUser?.default_reminder_email);

        // Recupera tutte le scadenze dell'utente
        if (currentUser) {
          const deadlinesResponse = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/deadlines`
          );
          const userDeadlines = deadlinesResponse.data.filter(
            (d) => d.user_id === currentUser.id
          );
          setDeadlinesCount(userDeadlines.length);
        }
      } catch (err) {
        setUser(null);
        setDeadlinesCount(0);
        setReminderChecked(false);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // Gestione click fuori dal dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-select-notifiche")) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Funzione per aggiornare il valore del checkbox nel DB
  const handleReminderCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setReminderChecked(checked);
    setUpdatingReminder(true);
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        profileImageId: user.profileImageId,
        default_reminder_email: checked,
      });
      setUser((prev) => ({
        ...prev,
        default_reminder_email: checked,
      }));
      setMessage({
        type: "success",
        text: checked
          ? "Promemoria email attivato con successo!"
          : "Promemoria email disattivato.",
      });
    } catch (err) {
      setReminderChecked(!checked);
      setMessage({
        type: "error",
        text: "Errore durante il salvataggio della preferenza.",
      });
    } finally {
      setUpdatingReminder(false);
      setTimeout(() => setMessage(null), 3500);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        menuItems={menuItems}
        user={user}
        loadingUser={loadingUser}
        activePath="/profile"
        bottomNav={
          <button className="logout-button" onClick={logoutAndRedirect}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="icon logout-icon"
            />
            <span>Logout</span>
          </button>
        }
      />
      <main className="main-content">
        <section>
          <h1 className="section-title">Profilo Utente</h1>
          <div className="profile-details">
            <div className="profile-left">
              <div className="profile-avatar avatar">
                {loadingUser ? (
                  <div className="skeleton skeleton-avatar"></div>
                ) : user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Avatar"
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                )}
              </div>
              <div className="profile-info-list">
                <div className="profile-field">
                  <span className="profile-label">Nome completo:</span>
                  <span className="profile-value">
                    {loadingUser ? (
                      <div className="skeleton skeleton-name skeleton-profile-page"></div>
                    ) : (
                      user?.full_name || "Nome Utente"
                    )}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">Email:</span>
                  <span className="profile-value">
                    {loadingUser ? (
                      <div className="skeleton skeleton-email skeleton-profile-page"></div>
                    ) : (
                      user?.email || "email@example.com"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-right">
              {!loadingUser && deadlinesCount === 1 ? (
                <p className="activity-summary">
                  Finora hai aggiunto{" "}
                  <Link to="/dashboard" className="count-up-link">
                    <GradientText
                      colors={[
                        "#430862",
                        "#a713f6",
                        "#e9ecef",
                        "#a713f6",
                        "#430862",
                      ]}
                      animationSpeed={5}
                      showBorder={false}
                    >
                      <CountUp
                        from={0}
                        to={deadlinesCount}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                      />
                    </GradientText>
                  </Link>{" "}
                  scadenza
                </p>
              ) : deadlinesCount > 1 || deadlinesCount === 0 ? (
                <p className="activity-summary">
                  Finora hai aggiunto{" "}
                  <Link to="/dashboard" className="count-up-link">
                    <GradientText
                      colors={[
                        "#430862",
                        "#a713f6",
                        "#e9ecef",
                        "#a713f6",
                        "#430862",
                      ]}
                      animationSpeed={5}
                      showBorder={false}
                    >
                      <CountUp
                        from={0}
                        to={deadlinesCount}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                      />
                    </GradientText>
                  </Link>{" "}
                  scadenze
                </p>
              ) : null}
              {!loadingUser && deadlinesCount === 0 ? (
                <p
                  style={{
                    marginTop: 8,
                    color: "var(--card-title-icon-color)",
                    fontSize: "1.1rem",
                  }}
                  className="activity-summary"
                >
                  <SplitText
                    text="Inizia ora!"
                    className="text-2xl font-semibold text-center activity-summary-important-text"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.6}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                  />{" "}
                  Sfrutta i vantaggi di HomeCloud aggiungendo la tua prima
                  scadenza
                </p>
              ) : deadlinesCount > 0 ? (
                <p
                  style={{
                    marginTop: 8,
                    fontSize: "1.1rem",
                  }}
                  className="activity-summary"
                >
                  <SplitText
                    text="Continua così!"
                    className="text-2xl font-semibold text-center activity-summary-important-text"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.6}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                  />{" "}
                  Tieni sempre sotto controllo le tue scadenze con HomeCloud
                </p>
              ) : null}
            </div>
          </div>

          <hr className="profile-divider" />

          <div className="profile-settings card-notifiche">
            <h2 className="section-subtitle">
              Impostazioni Preferenze Notifiche
            </h2>
            <div className="setting-row">
              <p className="setting-label notification-label">
                Email di promemoria
              </p>
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  id="notification-checkbox"
                  checked={reminderChecked}
                  onChange={handleReminderCheckboxChange}
                  disabled={loadingUser || updatingReminder}
                  tabIndex={0}
                />
                {reminderChecked && (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                )}
              </div>
            </div>
            <div className="setting-row">
              <label
                htmlFor="notification-frequency"
                className="setting-label notification-label"
              >
                Frequenza delle notifiche
              </label>
              <div
                className={`custom-select custom-select-notifiche${
                  dropdownOpen ? " open" : ""
                }`}
                tabIndex={0}
                onClick={() => setDropdownOpen((open) => !open)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setDropdownOpen((open) => !open);
                  if (e.key === "Escape") setDropdownOpen(false);
                }}
              >
                <div
                  className={`selected-option${
                    selectedFrequency === "" ? " placeholder" : ""
                  }`}
                >
                  {notificationOptions.find(
                    (opt) => opt.value === selectedFrequency
                  )?.label || "Seleziona frequenza"}
                </div>
                {dropdownOpen && (
                  <ul className="options">
                    {notificationOptions.map((option, index) => (
                      <li
                        key={option.value}
                        className={`option${
                          selectedFrequency === option.value ? " selected" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFrequency(option.value);
                          setDropdownOpen(false);
                        }}
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            setSelectedFrequency(option.value);
                            setDropdownOpen(false);
                          } else if (event.key === "Tab") {
                            event.preventDefault();
                            // Trova tutte le opzioni visibili
                            const optionsEls = Array.from(
                              event.currentTarget.parentNode.querySelectorAll(
                                ".option"
                              )
                            );
                            const nextIndex = (index + 1) % optionsEls.length;
                            optionsEls[nextIndex].focus();
                          }
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
