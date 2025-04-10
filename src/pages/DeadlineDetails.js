import React from "react";

const DeadlineDetails = ({ match }) => {
  const { id } = match.params;

  return (
    <div>
      <h1>Dettagli Scadenza: {id}</h1>
      <p>Visualizza i dettagli della scadenza qui.</p>
    </div>
  );
};

export default DeadlineDetails;
