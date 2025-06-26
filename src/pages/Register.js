import React, { useState } from "react";
import { signUp, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Funzione per estrarre il messaggio di errore
  const getErrorMessage = (error) => {
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    if (error?.errors?.[0]?.message) return error.errors[0].message;
    return "Si è verificato un errore. Riprova.";
  };

  // Genera un profileImageId casuale tra avatar0 e avatar4
  const getRandomAvatarId = () => {
    const n = Math.floor(Math.random() * 5);
    return `avatar${n}`;
  };

  // Capitalizza la prima lettera di ogni parola
  const capitalizeWords = (str) =>
    str
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName.trim().includes(" ")) {
      setError("Inserire nome e cognome completo");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non coincidono");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const profileImageId = getRandomAvatarId();
      const capitalizedFullName = capitalizeWords(fullName.trim());

      // 1. Prima controlla se l'utente esiste già nel database
      try {
        const existingUsersResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        const existingUser = existingUsersResponse.data.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
          setError(
            "Un account con questa email esiste già. Prova ad accedere invece di registrarti."
          );
          setIsSubmitting(false);
          return;
        }
      } catch (dbCheckError) {
        console.error(
          "Errore durante il controllo dell'esistenza dell'utente:",
          dbCheckError
        );
        // Continua comunque con la registrazione
      }

      // 2. Registrazione Cognito
      let cognitoSuccess = false;
      try {
        await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              name: capitalizedFullName,
              "custom:profileImageId": profileImageId,
            },
          },
        });
        cognitoSuccess = true;
      } catch (cognitoError) {
        console.error("Errore Cognito:", cognitoError);
        throw cognitoError;
      }

      // 3. Inserimento nel database
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
          full_name: capitalizedFullName,
          email,
          profileImageId,
        });
      } catch (dbError) {
        console.error("Errore database dopo successo Cognito:", dbError);

        // Se il database fallisce ma Cognito è riuscito, prova a pulire Cognito
        if (cognitoSuccess) {
          try {
            // Questo richiede configurazione admin per funzionare
            console.warn(
              "Utente creato in Cognito ma non nel database. Necessaria pulizia manuale."
            );
          } catch (cleanupError) {
            console.error("Errore durante la pulizia:", cleanupError);
          }
        }

        throw new Error(
          "Errore durante la creazione dell'account. Contatta il supporto se il problema persiste."
        );
      }

      setSuccess(
        "Registrazione completata! Controlla la tua email per il codice di conferma"
      );
      setShowConfirm(true);
    } catch (err) {
      console.error("Registration error:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await confirmSignUp({ username: email, confirmationCode });
      setSuccess("Account confermato con successo!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.error("Confirmation error:", err);
      setError(getErrorMessage(err));
      setConfirmationCode(""); // Pulisci il codice
    }
  };

  const handleResendCode = async () => {
    setError("");
    setSuccess("");
    try {
      await resendSignUpCode({ username: email });
      setSuccess("Nuovo codice di conferma inviato!");
    } catch (err) {
      console.error("Resend code error:", err);
      setError(getErrorMessage(err));
    }
  };

  // Funzione per gestire input del codice di conferma (solo numeri, max 6)
  const handleConfirmationCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Solo numeri
    if (value.length <= 6) {
      setConfirmationCode(value);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <h1 className="auth-title">
              {showConfirm ? "Conferma Account" : "Crea il tuo Account"}
            </h1>
            <p className="auth-subtitle">
              {showConfirm
                ? "Inserisci il codice di conferma ricevuto via email"
                : "Inizia gratuitamente con HomeCloud"}
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="auth-content">
            {!showConfirm ? (
              <form className="auth-form" onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="fullName">Nome Completo</label>
                  <div className="input-wrapper">
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      maxLength={255}
                      disabled={isSubmitting}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      maxLength={255}
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
                      minLength={8}
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
                  <div className="password-requirements">
                    <small>La password deve contenere almeno 8 caratteri</small>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Conferma Password</label>
                  <div className="input-wrapper">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                      disabled={isSubmitting}
                      className="form-input"
                    />
                    <button
                      type="button"
                      className={`password-toggle ${
                        showConfirmPassword ? "show" : "hide"
                      }`}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Nascondi password"
                          : "Mostra password"
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
                      Registrazione in corso...
                    </>
                  ) : (
                    "Crea Account Gratuito"
                  )}
                </button>

                <div className="auth-divider">
                  <span>Hai già un account?</span>
                </div>

                <Link to="/login" className="auth-btn tertiary">
                  Accedi al tuo Account
                </Link>

                {error && <div className="message error">{error}</div>}
                {success && <div className="message success">{success}</div>}
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleConfirm}>
                <div className="verification-info">
                  <div className="verification-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="#10b981"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="m22 6-10 6L2 6"
                        stroke="#10b981"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <p>
                    Abbiamo inviato un codice di verifica a: <br />
                    <strong>{email}</strong>
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmationCode">Codice di Conferma</label>
                  <div className="input-wrapper">
                    <input
                      id="confirmationCode"
                      type="text"
                      value={confirmationCode}
                      onChange={handleConfirmationCodeChange}
                      required
                      maxLength={6}
                      className="form-input code-input"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>

                <button type="submit" className="auth-btn primary">
                  Conferma Account
                </button>

                <button
                  type="button"
                  className="auth-btn secondary"
                  onClick={handleResendCode}
                >
                  Invia Nuovo Codice
                </button>

                <button
                  type="button"
                  className="auth-btn link"
                  onClick={() => {
                    setShowConfirm(false);
                    setConfirmationCode("");
                    setError("");
                    setSuccess("");
                  }}
                >
                  Modifica Email
                </button>

                {error && <div className="message error">{error}</div>}
                {success && <div className="message success">{success}</div>}
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
};

export default Register;
