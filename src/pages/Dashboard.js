import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/deadlines`
        );
        setDeadlines(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel caricamento delle scadenze:", error);
        setLoading(false);
      }
    };

    fetchDeadlines();
  }, []);

  if (loading) {
    return <div>Loading deadlines...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Le tue scadenze</h1>
      <div className="deadlines-container">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className="deadline-card">
            <h3>{deadline.title}</h3>
            <p>{deadline.description}</p>
            <p>{new Date(deadline.due_date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
