import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheck,
  faPen,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserProfileSection = ({ user, loadingUser, onUserUpdate, onMessage }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [updatingName, setUpdatingName] = useState(false);

  // Funzione per validare e filtrare l'input
  const handleNameInputChange = (e) => {
    const value = e.target.value;

    // Regex per permettere solo lettere, spazi, apostrofi e caratteri accentati
    const allowedCharsRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s']*$/;

    // Controlla se il valore contiene solo caratteri consentiti
    if (allowedCharsRegex.test(value)) {
      setEditedName(value);
    }
    // Se contiene caratteri non consentiti, non aggiorna lo stato
    // L'input rimarrà con il valore precedente
  };

  // Gestione modifica nome
  const handleStartEditName = () => {
    setEditedName(user?.full_name || "");
    setIsEditingName(true);
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  const handleNameKeyPress = (e) => {
    // Previeni l'inserimento di numeri anche tramite tastiera
    const char = e.key;
    const isNumber = /[0-9]/.test(char);
    const isSpecialChar = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/.test(char);

    // Permettiamo solo: lettere, spazi, backspace, delete, tab, enter, escape
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "Escape",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];

    if (isNumber || (isSpecialChar && !allowedKeys.includes(char) && char !== "'" && char !== ' ')) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      handleSaveEditedName();
    } else if (e.key === "Escape") {
      handleCancelEditName();
    }
  };

  const handleSaveEditedName = async () => {
    const trimmedName = editedName.trim();

    // Validazione frontend
    if (!trimmedName) {
      onMessage({
        type: "error",
        text: "Il nome non può essere vuoto.",
      });
      return;
    }

    if (!trimmedName.includes(" ")) {
      onMessage({
        type: "error",
        text: "Inserire nome e cognome completo.",
      });
      return;
    }

    // Controllo aggiuntivo: verificare che non ci siano numeri
    const containsNumbers = /\d/.test(trimmedName);
    if (containsNumbers) {
      onMessage({
        type: "error",
        text: "Il nome non può contenere numeri.",
      });
      return;
    }

    // Controllo che ogni parola abbia almeno 2 caratteri
    const words = trimmedName.split(/\s+/);
    const hasShortWords = words.some((word) => word.length < 2);
    if (hasShortWords) {
      onMessage({
        type: "error",
        text: "Nome e cognome devono avere almeno 2 caratteri ciascuno.",
      });
      return;
    }

    if (trimmedName === user?.full_name) {
      setIsEditingName(false);
      return;
    }

    setUpdatingName(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        {
          id: user.id,
          full_name: trimmedName,
          email: user.email,
          profileImageId: user.profileImageId,
          default_reminder_email: user.default_reminder_email,
        }
      );

      // Aggiorna l'utente nel componente padre
      onUserUpdate(response.data);
      setIsEditingName(false);
      setEditedName("");

      onMessage({
        type: "success",
        text: "Nome aggiornato con successo!",
      });
    } catch (err) {
      console.error("Errore aggiornamento nome:", err);
      onMessage({
        type: "error",
        text: "Errore durante l'aggiornamento del nome.",
      });
    } finally {
      setUpdatingName(false);
    }
  };

  return (
    <div className="profile-left">
      <div className="profile-avatar avatar">
        {loadingUser ? (
          <div className="skeleton skeleton-avatar"></div>
        ) : user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Avatar"
            className="avatar-image"
            draggable="false"
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
          <div className="profile-value-container">
            {isEditingName ? (
              <div className="edit-name-container">
                <input
                  type="text"
                  value={editedName}
                  onChange={handleNameInputChange}
                  onKeyDown={handleNameKeyPress}
                  className="edit-name-input"
                  placeholder="Nome e Cognome"
                  disabled={updatingName}
                  autoFocus
                  maxLength={255}
                  title="Solo lettere, spazi e apostrofi sono consentiti"
                />
                <div className="edit-name-actions">
                  <button
                    onClick={handleSaveEditedName}
                    disabled={updatingName}
                    className="edit-action-btn save-btn"
                    title="Salva modifiche"
                  >
                    {updatingName ? (
                      <span className="loading-spinner-small"></span>
                    ) : (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </button>
                  <button
                    onClick={handleCancelEditName}
                    disabled={updatingName}
                    className="edit-action-btn cancel-btn"
                    title="Annulla modifiche"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-value-display">
                <span className="profile-value">
                  {loadingUser ? (
                    <div className="skeleton skeleton-name skeleton-profile-page"></div>
                  ) : (
                    user?.full_name || "Nome Utente"
                  )}
                </span>
                {!loadingUser && (
                  <button
                    onClick={handleStartEditName}
                    className="edit-trigger-btn"
                    title="Modifica nome"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                )}
              </div>
            )}
          </div>
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
  );
};

export default UserProfileSection;
