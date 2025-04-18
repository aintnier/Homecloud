import React from "react";
import { useParams } from "react-router-dom";

const DeadlineDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Dettagli Scadenza</h1>
      <p>ID Scadenza: {id}</p>
      {/* Qui puoi aggiungere il codice per recuperare e mostrare i dettagli della scadenza */}
    </div>
  );
};

export default DeadlineDetails;
