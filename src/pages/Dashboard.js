import React, { useState, useEffect } from "react";

function Dashboard() {
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    // Recupera le scadenze dal server
    fetch(`${process.env.REACT_APP_API_URL}/api/deadlines`)
      .then((response) => response.json())
      .then((data) => setDeadlines(data))
      .catch((error) => console.error("Error fetching deadlines:", error));
  }, []);

  return (
    <div className="dashboard">
      {deadlines.length > 0 ? (
        deadlines.map((deadline) => (
          <div key={deadline.id} className="card">
            <div className="card-header">{deadline.title}</div>
            <div className="card-body">
              <p>{deadline.description}</p>
              <p>Data: {new Date(deadline.due_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading deadlines...</p>
      )}
    </div>
  );
}

export default Dashboard;
