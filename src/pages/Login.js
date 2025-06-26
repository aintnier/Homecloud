import React, { useState } from "react";
import {
  signIn,
  signOut,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStep, setResetStep] = useState(1);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Funzione per estrarre il messaggio di errore
  const getErrorMessage = (error) => {
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    if (error?.errors?.[0]?.message) return error.errors[0].message;
    return "Si è verificato un errore. Riprova.";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signOut();
      await signIn({ username: email, password });
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError(getErrorMessage(err));
      setPassword(""); // Pulisci la password
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");
    try {
      await resetPassword({ username: resetEmail });
      setResetStep(2);
      setResetMessage("Codice di verifica inviato via email.");
    } catch (err) {
      console.error("Reset request error:", err);
      setError(getErrorMessage(err));
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");

    // Validazione codice
    if (resetCode.length !== 6) {
      setError("Il codice di verifica deve essere di 6 cifre.");
      return;
    }

    try {
      await confirmResetPassword({
        username: resetEmail,
        confirmationCode: resetCode,
        newPassword,
      });
      setResetMessage("Password aggiornata con successo. Ora puoi accedere.");
      // Resetta tutto e torna al login dopo 3 secondi
      setTimeout(() => {
        setShowReset(false);
        setResetStep(1);
        setResetEmail("");
        setResetCode("");
        setNewPassword("");
        setResetMessage("");
        setError("");
      }, 3000);
    } catch (err) {
      console.error("Reset submit error:", err);
      setError(getErrorMessage(err));
      setResetCode(""); // Pulisci il codice se c'è errore
    }
  };

  // Funzione per gestire input del codice (solo numeri, max 6)
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Solo numeri
    if (value.length <= 6) {
      setResetCode(value);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <h1 className="auth-title">
              {showReset ? "Recupera Password" : "Bentornato"}
            </h1>
            <p className="auth-subtitle">
              {showReset
                ? "Inserisci la tua email per recuperare l'accesso"
                : "Accedi al tuo account HomeCloud"}
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="auth-content">
            {!showReset ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="form-input"
                    />
                    <button
                      type="button"
                      className={`password-toggle ${
                        showPassword ? "show" : "hide"
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Nascondi password" : "Mostra password"
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="auth-btn primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Accesso in corso...
                    </>
                  ) : (
                    "Accedi"
                  )}
                </button>

                <Link
                  to="#"
                  className="forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isSubmitting) {
                      setShowReset(true);
                    }
                  }}
                  style={
                    isSubmitting ? { pointerEvents: "none", opacity: 0.6 } : {}
                  }
                >
                  Password dimenticata?
                </Link>

                <div className="auth-divider">
                  <span>Non hai ancora un account?</span>
                </div>

                <Link to="/register" className="auth-btn tertiary">
                  Registrati Gratis
                </Link>

                {error && <div className="message error">{error}</div>}
              </form>
            ) : (
              <form
                className="auth-form"
                onSubmit={
                  resetStep === 1 ? handleResetRequest : handleResetSubmit
                }
              >
                {resetStep === 1 ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="resetEmail">Indirizzo Email</label>
                      <div className="input-wrapper">
                        <input
                          id="resetEmail"
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>

                    <button type="submit" className="auth-btn primary">
                      Invia Codice di Verifica
                    </button>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="resetCode">Codice di Verifica</label>
                      <div className="input-wrapper">
                        <input
                          id="resetCode"
                          type="text"
                          value={resetCode}
                          onChange={handleCodeChange}
                          required
                          maxLength={6}
                          className="form-input code-input"
                          inputMode="numeric"
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="code-requirements">
                        <small>
                          Inserisci il codice di 6 cifre ricevuto via email
                        </small>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword">Nuova Password</label>
                      <div className="input-wrapper">
                        <input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          className="form-input"
                        />
                        <button
                          type="button"
                          className={`password-toggle ${
                            showPassword ? "show" : "hide"
                          }`}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword
                              ? "Nascondi password"
                              : "Mostra password"
                          }
                        />
                      </div>
                      <div className="password-requirements">
                        <small>
                          La password deve contenere almeno 8 caratteri
                        </small>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="auth-btn primary"
                      disabled={
                        resetCode.length !== 6 || newPassword.length < 8
                      }
                    >
                      Cambia Password
                    </button>
                  </>
                )}

                <button
                  type="button"
                  className="auth-btn secondary"
                  onClick={() => {
                    setShowReset(false);
                    setResetStep(1);
                    setResetEmail("");
                    setResetCode("");
                    setNewPassword("");
                    setResetMessage("");
                    setError("");
                  }}
                >
                  Torna al Login
                </button>

                {resetMessage && (
                  <div className="message success">{resetMessage}</div>
                )}
                {error && <div className="message error">{error}</div>}
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <Link to="/landing" className="back-to-home">
              Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
