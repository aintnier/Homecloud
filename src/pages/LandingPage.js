import React, { useState, useEffect } from "react";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Grazie per il tuo messaggio! Ti contatteremo presto.");
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed nav height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleRegisterClick = () => {
    window.location.href = "/register";
  };

  return (
    <div className="landing-page">
      {/* Glass Navigation */}
      <nav className={`glass-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="imgs/Logo.png" alt="HomeCloud" className="nav-logo-img" />
            <span className="nav-logo-text">HomeCloud</span>
          </div>
          <div className="nav-links">
            <button
              onClick={() => scrollToSection("hero")}
              className="nav-link"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="nav-link"
            >
              Vantaggi
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="nav-link"
            >
              Pricing
            </button>
            {/* <button
              onClick={() => scrollToSection("testimonials")}
              className="nav-link"
            >
              Testimonianze
            </button> */}
            <button
              onClick={() => scrollToSection("contact")}
              className="nav-link"
            >
              Contatti
            </button>
            <button onClick={handleRegisterClick} className="nav-cta-btn">
              Registrati
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-background">
          <div className="hero-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
          </div>
          <div className="hero-gradient"></div>
        </div>
        
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">🚀</span>
                <span>Nuovo • Completamente Gratuito</span>
              </div>
              
              <h1 className="hero-title">
                <span className="title-main">HomeCloud</span>
                <span className="title-accent">per la tua famiglia</span>
              </h1>
              
              <p className="hero-description">
                Trasforma il caos quotidiano in <span className="text-highlight">organizzazione perfetta</span>. 
                Gestisci scadenze, documenti e appuntamenti familiari con un sistema 
                intelligente che <span className="text-highlight">non dimentica mai</span> nulla.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">0€</div>
                  <div className="stat-label">Sempre gratis</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">2min</div>
                  <div className="stat-label">Setup veloce</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">6</div>
                  <div className="stat-label">Membri famiglia</div>
                </div>
              </div>
              
              <div className="hero-buttons">
                <button
                  onClick={handleRegisterClick}
                  className="hero-btn-primary"
                >
                  <span>Inizia Gratis Ora</span>
                  <div className="btn-shine"></div>
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="hero-btn-secondary"
                >
                  <span className="btn-icon">▶</span>
                  <span>Guarda come funziona</span>
                </button>
              </div>
              
              <div className="hero-trust">
                <span>✅ Nessuna carta di credito • ✅ Privacy garantita • ✅ Hosting AWS sicuro</span>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="floating-card card-1">
                <div className="card-icon">📅</div>
                <div className="card-content">
                  <div className="card-title">Prossima Scadenza</div>
                  <div className="card-desc">Bolletta Enel • 3 giorni</div>
                </div>
                <div className="card-status status-warning"></div>
              </div>
              
              <div className="floating-card card-2">
                <div className="card-icon">👨‍⚕️</div>
                <div className="card-content">
                  <div className="card-title">Visita Marco</div>
                  <div className="card-desc">Controllo pediatrico</div>
                </div>
                <div className="card-status status-success"></div>
              </div>
              
              <div className="floating-card card-3">
                <div className="card-icon">📧</div>
                <div className="card-content">
                  <div className="card-title">Email inviata</div>
                  <div className="card-desc">Promemoria attivato</div>
                </div>
                <div className="card-status status-info"></div>
              </div>
              
              <div className="hero-logo-container">
                <img
                  src="imgs/Logo.png"
                  alt="HomeCloud Logo"
                  className="hero-logo-img"
                />
                <div className="logo-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Perché scegliere HomeCloud?</h2>
            <p className="section-subtitle">
              Tutto quello che serve per organizzare la tua famiglia
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Gestione Scadenze</h3>
              <p>
                Tieni traccia di documenti, bollette, appuntamenti medici e
                tutte le scadenze importanti della famiglia
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Notifiche Smart</h3>
              <p>
                Ricevi promemoria automatici via email per non dimenticare mai
                una scadenza importante
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Gestione Familiare</h3>
              <p>
                Organizza le informazioni di tutti i membri della famiglia in un
                unico posto sicuro
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Sicurezza AWS</h3>
              <p>
                I tuoi dati sono protetti con crittografia avanzata su
                infrastruttura cloud sicura
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Accesso Ovunque</h3>
              <p>
                Accedi ai tuoi dati da qualsiasi dispositivo, sempre
                sincronizzati e aggiornati
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Setup Veloce</h3>
              <p>
                Inizia in pochi minuti. Interfaccia intuitiva e configurazione
                guidata
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pricing Semplice</h2>
            <p className="section-subtitle">
              Tutto completamente gratuito per sempre
            </p>
          </div>

          <div className="pricing-card">
            <div className="pricing-badge">Sempre Gratis</div>
            <h3 className="pricing-title">Piano Famiglia</h3>
            <div className="pricing-price">
              <span className="price-currency">€</span>
              <span className="price-amount">0</span>
              <span className="price-period">/mese</span>
            </div>
            <ul className="pricing-features">
              <li>✓ Gestione illimitata scadenze</li>
              <li>✓ Notifiche email automatiche</li>
              <li>✓ Fino a 6 membri famiglia</li>
              <li>✓ Backup sicuro su AWS</li>
              <li>✓ Accesso da tutti i dispositivi</li>
              <li>✓ Supporto email</li>
              <li>✓ Nessuna pubblicità</li>
            </ul>
            <button onClick={handleRegisterClick} className="pricing-btn">
              Inizia Subito
            </button>
            <p className="pricing-note">Nessuna carta di credito richiesta</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section - COMMENTED FOR FUTURE USE */}
      {/* <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Cosa dicono le famiglie</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Finalmente non dimentichiamo più le scadenze! HomeCloud ci ha
                semplificato la vita."
              </div>
              <div className="testimonial-author">
                <strong>Marco & Giulia</strong>
                <span>Famiglia di 4 persone</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                "Perfetto per organizzare tutti i documenti dei bambini.
                Interfaccia molto intuitiva."
              </div>
              <div className="testimonial-author">
                <strong>Elena</strong>
                <span>Mamma di 2 bambini</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                "Le notifiche email sono precise e puntuali. Non abbiamo mai più
                pagato multe per ritardi!"
              </div>
              <div className="testimonial-author">
                <strong>Roberto</strong>
                <span>Papà organizzato</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Hai domande?</h2>
            <p className="section-subtitle">
              Siamo qui per aiutarti. Contattaci per qualsiasi informazione
            </p>
          </div>

          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:support@homecloud.it">support@homecloud.it</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div>
                  <h4>Orari Assistenza</h4>
                  <p>Lun-Ven 9:00-18:00</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⚡</div>
                <div>
                  <h4>Risposta Rapida</h4>
                  <p>Entro 24 ore lavorative</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Il tuo nome"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="La tua email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Come possiamo aiutarti?"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-submit-btn">
                Invia Messaggio
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Pronto a organizzare la tua famiglia?</h2>
            <p className="cta-subtitle">
              Unisciti a centinaia di famiglie che hanno già semplificato la
              loro vita con HomeCloud
            </p>
            <button onClick={handleRegisterClick} className="cta-btn">
              Inizia Gratis Ora
            </button>
            <p className="cta-note">
              Setup in 2 minuti • Nessuna carta richiesta • Sempre gratuito
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <img
                  src="imgs/Logo.png"
                  alt="HomeCloud"
                  className="footer-logo-img"
                />
                <span className="footer-logo-text">HomeCloud</span>
              </div>
              <p className="footer-description">
                La piattaforma smart per la gestione familiare. Semplice,
                sicura, sempre gratuita.
              </p>
            </div>

            <div className="footer-section">
              <h4>Prodotto</h4>
              <ul className="footer-links">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="footer-link"
                  >
                    Funzionalità
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="footer-link"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <a href="/faq" className="footer-link">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/help" className="footer-link">
                    Centro Assistenza
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legale</h4>
              <ul className="footer-links">
                <li>
                  <a href="/privacy-policy" className="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="footer-link">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" className="footer-link">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="/unsubscribe" className="footer-link">
                    Unsubscribe
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Supporto</h4>
              <ul className="footer-links">
                <li>
                  <a href="mailto:support@homecloud.it" className="footer-link">
                    Email Support
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="footer-link"
                  >
                    Contattaci
                  </button>
                </li>
                <li>
                  <a href="/status" className="footer-link">
                    Status Sistema
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 HomeCloud. Tutti i diritti riservati.</p>
            <div className="footer-social">
              <span>Made with ❤️ in Italy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
