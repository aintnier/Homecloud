import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Unsubscribe.css";
import { getSpecificLogo } from "../helpers/logoHelper";

const Unsubscribe = () => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [unsubscribeStep, setUnsubscribeStep] = useState("initial"); // initial, success, error
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const logo = await getSpecificLogo("Logo-2.1.1");
        setLogoUrl(logo);
      } catch (error) {
        console.error("Error loading logo:", error);
      }
    };

    fetchLogo();

    // Controlla se c'è un email nei parametri URL (da link email)
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Per favore inserisci un indirizzo email valido.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Qui implementerai la logica per disattivare le email
      // Per ora simuliamo una chiamata API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Implementare chiamata API per disattivare le notifiche email
      // await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/unsubscribe`, {
      //   email: email.trim().toLowerCase()
      // });

      setUnsubscribeStep("success");
    } catch (error) {
      console.error("Errore durante la disiscrizione:", error);
      setUnsubscribeStep("error");
      setMessage(
        "Si è verificato un errore. Riprova più tardi o contatta il supporto."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="unsubscribe-page">
      <nav className="simple-nav">
        <div className="nav-container">
          <Link to="/landing" className="nav-logo-link">
            <div className="nav-logo">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="HomeCloud"
                  className="nav-logo-img"
                  draggable="false"
                />
              )}
            </div>
          </Link>
          <Link to="/landing" className="back-link">
            ← Torna alla Home
          </Link>
        </div>
      </nav>

      <main className="unsubscribe-content">
        <div className="container">
          <div className="unsubscribe-card">
            {unsubscribeStep === "initial" && (
              <>
                <div className="unsubscribe-header">
                  <div className="unsubscribe-icon">📧</div>
                  <h1>Gestione Preferenze Email</h1>
                  <p className="unsubscribe-subtitle">
                    Disattiva le notifiche email di HomeCloud
                  </p>
                </div>

                <div className="unsubscribe-info">
                  <h2>Come disattivare le notifiche email</h2>
                  <div className="info-options">
                    <div className="option-card">
                      <div className="option-number">1</div>
                      <div className="option-content">
                        <h3>Dal tuo profilo utente</h3>
                        <p>
                          Accedi al tuo account HomeCloud e vai nella sezione{" "}
                          <Link to="/profile" className="profile-link">
                            Profilo Utente
                          </Link>{" "}
                          per gestire le tue preferenze di notifica.
                        </p>
                      </div>
                    </div>

                    <div className="option-card">
                      <div className="option-number">2</div>
                      <div className="option-content">
                        <h3>Tramite questo modulo</h3>
                        <p>
                          Inserisci il tuo indirizzo email qui sotto per
                          disattivare immediatamente tutte le notifiche
                          automatiche.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleUnsubscribe} className="unsubscribe-form">
                  <div className="form-group">
                    <label htmlFor="email">Indirizzo Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tua-email@example.com"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="unsubscribe-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Elaborando...
                      </>
                    ) : (
                      "Disattiva Notifiche Email"
                    )}
                  </button>

                  {message && <div className="message error">{message}</div>}
                </form>

                <div className="unsubscribe-note">
                  <h3>Cosa succede dopo la disiscrizione?</h3>
                  <ul>
                    <li>
                      <strong>Non riceverai più email automatiche</strong> di
                      promemoria per le tue scadenze
                    </li>
                    <li>
                      Il tuo account HomeCloud <strong>rimarrà attivo</strong> e
                      potrai continuare a utilizzare la piattaforma
                    </li>
                    <li>
                      Potrai <strong>riattivare le notifiche</strong> in
                      qualsiasi momento dal tuo profilo utente
                    </li>
                    <li>
                      Continuerai a ricevere email importanti relative al tuo
                      account (sicurezza, modifiche servizio, ecc.)
                    </li>
                  </ul>
                </div>
              </>
            )}

            {unsubscribeStep === "success" && (
              <>
                <div className="unsubscribe-header success">
                  <div className="unsubscribe-icon success">✅</div>
                  <h1>Disiscrizione Completata</h1>
                  <p className="unsubscribe-subtitle">
                    Le notifiche email sono state disattivate con successo
                  </p>
                </div>

                <div className="success-info">
                  <div className="success-message">
                    <h2>Email disattivate per: {email}</h2>
                    <p>
                      Da questo momento non riceverai più email automatiche di
                      promemoria per le scadenze di HomeCloud.
                    </p>
                  </div>

                  <div className="next-steps">
                    <h3>Cosa puoi fare ora:</h3>
                    <ul>
                      <li>
                        <Link to="/dashboard" className="action-link">
                          Accedi alla Dashboard
                        </Link>{" "}
                        per gestire le tue scadenze
                      </li>
                      <li>
                        <Link to="/profile" className="action-link">
                          Vai al Profilo
                        </Link>{" "}
                        per riattivare le notifiche in futuro
                      </li>
                      <li>
                        <Link to="/landing" className="action-link">
                          Torna alla Home
                        </Link>{" "}
                        di HomeCloud
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="reactivate-info">
                  <h3>Vuoi riattivare le notifiche?</h3>
                  <p>
                    Puoi riattivare le email di promemoria in qualsiasi momento
                    accedendo al tuo{" "}
                    <Link to="/profile" className="profile-link">
                      Profilo Utente
                    </Link>{" "}
                    e attivando l'opzione "Email di promemoria".
                  </p>
                </div>
              </>
            )}

            {unsubscribeStep === "error" && (
              <>
                <div className="unsubscribe-header error">
                  <div className="unsubscribe-icon error">❌</div>
                  <h1>Errore nella Disiscrizione</h1>
                  <p className="unsubscribe-subtitle">
                    Non siamo riusciti a processare la tua richiesta
                  </p>
                </div>

                <div className="error-info">
                  <div className="error-message">
                    <p>{message}</p>
                  </div>

                  <div className="error-actions">
                    <button
                      onClick={() => {
                        setUnsubscribeStep("initial");
                        setMessage("");
                      }}
                      className="retry-btn"
                    >
                      Riprova
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="support-info">
              <h3>Hai bisogno di aiuto?</h3>
              <div className="support-options">
                <div className="support-option">
                  <strong>Email Support:</strong>
                  <a href="mailto:support@mail.homecloud.ninja">
                    support@mail.homecloud.ninja
                  </a>
                </div>
                <div className="support-option">
                  <strong>Oggetto:</strong> "Gestione Email - [Tua richiesta]"
                </div>
              </div>
              <p className="support-note">
                Rispondiamo entro 24 ore lavorative. Per richieste urgenti o
                problemi con l'account, contattaci direttamente.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="simple-footer">
        <div className="container">
          <p>&copy; 2025 HomeCloud. Tutti i diritti riservati.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Unsubscribe;
