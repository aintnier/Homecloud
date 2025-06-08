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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CountUp from "../components/CountUp/CountUp.jsx";
import GradientText from "../components/GradientText/GradientText.jsx";
import SplitText from "../components/SplitText/SplitText.jsx";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function Sidebar({ user, loadingUser }) {
  return (
    <aside className="sidebar">
      <Link to={"/dashboard"} className="logo">
        <span>Home</span>Cloud
      </Link>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <Link to={`/profile`}>
              <FontAwesomeIcon icon={faCircleUser} className="icon" />
              <span>Profilo Utente</span>
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
        <div className="user-info">
          {loadingUser ? (
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

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [deadlinesCount, setDeadlinesCount] = useState(0);

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
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar user={user} loadingUser={loadingUser} />
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
                    {user?.full_name || "Nome Utente"}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="profile-label">Email:</span>
                  <span className="profile-value">
                    {user?.email || "email@example.com"}
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
                    threshold={0.1}
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
                    text="Contiua così!"
                    className="text-2xl font-semibold text-center activity-summary-important-text"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
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

          <div className="profile-settings">
            <h2 className="section-subtitle">
              Impostazioni Preferenze Notifiche
            </h2>
            <div className="setting-row">
              <label className="setting-label">Email di promemoria</label>
              <input
                type="checkbox"
                checked
                readOnly
                className="setting-toggle"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
