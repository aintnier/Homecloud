import React from "react";

const AddDeadline = () => {
  return (
    <div>
      <h1>Aggiungi Scadenza</h1>
      <form>
        <label>Descrizione:</label>
        <input type="text" />
        <label>Data:</label>
        <input type="date" />
        <button type="submit">Aggiungi</button>
      </form>
    </div>
  );
};

export default AddDeadline;
