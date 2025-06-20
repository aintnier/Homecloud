import { Link } from "react-router-dom";
import GradientText from "../components/GradientText/GradientText";
import "../styles/LandingPage.css";

const LandingPage = () => (
  <div className="landing-container">
    <header className="landing-header">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="landing-title"
      >
        HomeCloud
      </GradientText>
      <p className="landing-subtitle">
        Organizza, ricorda e gestisci tutte le tue scadenze in un unico posto
        sicuro.
      </p>
      <Link to="/register" className="cta-button">
        Inizia ora gratuitamente
      </Link>
    </header>

    <section className="landing-features">
      <div className="feature">
        <h2>🔔 Promemoria intelligenti</h2>
        <p>
          Ricevi notifiche via email per non dimenticare mai una scadenza
          importante.
        </p>
      </div>
      <div className="feature">
        <h2>🔒 Sicurezza e privacy</h2>
        <p>I tuoi dati sono protetti e accessibili solo a te.</p>
      </div>
      <div className="feature">
        <h2>📱 Accessibile ovunque</h2>
        <p>
          Gestisci le tue scadenze da qualsiasi dispositivo, in qualsiasi
          momento.
        </p>
      </div>
    </section>

    <section className="landing-cta">
      <h3>Pronto a semplificare la tua vita?</h3>
      <Link to="/register" className="cta-button large">
        Registrati gratis
      </Link>
      <p className="landing-login-link">
        Hai già un account? <Link to="/login">Accedi</Link>
      </p>
    </section>
  </div>
);

export default LandingPage;
