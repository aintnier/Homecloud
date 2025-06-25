import React, { useState } from "react";
import { signIn, resetPassword, signOut } from "aws-amplify/auth";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signOut();
      await signIn({ username: email, password });
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err);
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metodo per avviare il reset password
  const handleResetRequest = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");
    try {
      await resetPassword({ username: resetEmail });
      setResetStep(2);
      setResetMessage("Codice di verifica inviato via email.");
    } catch (err) {
      setError(err);
    }
  };

  // Metodo per completare il reset password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");
    try {
      await resetPassword({
        username: resetEmail,
        confirmationCode: resetCode,
        newPassword,
      });
      setResetMessage("Password aggiornata con successo. Ora puoi accedere.");
      setShowReset(false);
      setResetStep(1);
      setResetEmail("");
      setResetCode("");
      setNewPassword("");
    } catch (err) {
      setError(err);
      setResetCode("");
    }
  };

  return (
    <div className="login-container">
      <h1 className="auth-section-title">Accedi</h1>
      {!showReset ? (
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            <p>Email:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isSubmitting}
            />
          </label>
          <label>
            <p>Password:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isSubmitting}
            />
          </label>
          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Accesso..." : "Login"}
          </button>
          <button
            type="button"
            className="login-button"
            style={{ background: "#888", marginTop: 10 }}
            onClick={() => setShowReset(true)}
            disabled={isSubmitting}
          >
            Password dimenticata?
          </button>
          <div className="register-section">
            <p className="register-label">Non hai ancora un account?</p>
            <button
              type="button"
              className="register-link-button"
              onClick={() => (window.location.href = "/register")}
              disabled={isSubmitting}
            >
              Registrati
            </button>
          </div>
          {error && <div className="message error">{error}</div>}
        </form>
      ) : (
        <form
          className="login-form"
          onSubmit={resetStep === 1 ? handleResetRequest : handleResetSubmit}
        >
          {resetStep === 1 ? (
            <>
              <label>
                <p>Inserisci la tua email:</p>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </label>
              <button type="submit" className="login-button">
                Invia codice
              </button>
              <button
                type="button"
                className="login-button"
                style={{ background: "#888", marginTop: 10 }}
                onClick={() => setShowReset(false)}
              >
                Annulla
              </button>
            </>
          ) : (
            <>
              <label>
                <p>Codice di verifica:</p>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="Codice"
                  required
                />
              </label>
              <label>
                <p>Nuova password:</p>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nuova password"
                  required
                  minLength={8}
                />
              </label>
              <button type="submit" className="login-button">
                Cambia password
              </button>
              <button
                type="button"
                className="login-button"
                style={{ background: "#888", marginTop: 10 }}
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
                Annulla
              </button>
            </>
          )}
          {resetMessage && (
            <div className="message success">{resetMessage}</div>
          )}
          {error && <div className="message error">{error}</div>}
        </form>
      )}
    </div>
  );
}

export default Login;
