export function cognitoErrorToItalian(err) {
  if (!err || !err.code) return "Si è verificato un errore. Riprova.";
  switch (err.code) {
    case "UserNotFoundException":
      return "Utente non trovato.";
    case "NotAuthorizedException":
      return "Email o password non corretti.";
    case "UserNotConfirmedException":
      return "Account non confermato. Controlla la tua email.";
    case "PasswordResetRequiredException":
      return "Devi reimpostare la password.";
    case "CodeMismatchException":
      return "Codice di verifica non valido.";
    case "ExpiredCodeException":
      return "Il codice di verifica è scaduto.";
    case "LimitExceededException":
      return "Hai superato il numero massimo di tentativi. Riprova più tardi.";
    case "UsernameExistsException":
      return "Esiste già un account con questa email.";
    default:
      return err.message || "Si è verificato un errore. Riprova.";
  }
}
