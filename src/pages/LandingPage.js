import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import { getSpecificLogo } from "../helpers/logoHelper";
import Silk from "../components/Silk/Silk.jsx";
import TextPressure from "../components/TextPressure/TextPressure.jsx";
import ShinyText from "../components/ShinyText/ShinyText.jsx";
import SplitText from "../components/SplitText/SplitText.jsx";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard.jsx";
import ContactForm from "../components/ContactForm"; // Aggiungi questa importazione
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import rocket from "openmoji/color/svg/1F680.svg";
import lightBulb from "openmoji/color/svg/1F4A1.svg";
import calendar from "openmoji/color/svg/1F4C5.svg";
import hospital from "openmoji/color/svg/1F3E5.svg";
import loveLetter from "openmoji/color/svg/1F48C.svg";
import checkMark from "openmoji/color/svg/2714.svg";
import email from "openmoji/color/svg/1F4E7.svg";
import barChart from "openmoji/color/svg/1F4CA.svg";
import shield from "openmoji/color/svg/1F6E1.svg";
import mobilePhone from "openmoji/color/svg/1F4F1.svg";
import lightning from "openmoji/color/svg/26A1.svg";
import hammerAndWrench from "openmoji/color/svg/1F6E0.svg";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [footerLogoUrl, setFooterLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const landingLogo = await getSpecificLogo("Logo-2.1.1");
        setLogoUrl(landingLogo);

        const footerLogo = await getSpecificLogo("Logo-1.2.1");
        setFooterLogoUrl(footerLogo);
      } catch (error) {
        console.error("Error loading logos:", error);
      }
    };

    fetchLogos();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
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
      <nav className={`glass-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link
            to="/landing"
            className="nav-logo-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
          >
            <div className="nav-logo">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="HomeCloud"
                  className="nav-logo-img"
                  draggable="false"
                />
              )}
            </div>
          </Link>
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

      <section id="hero" className="hero-section">
        <div className="hero-silk-background">
          <Silk
            speed={3}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.2}
            rotation={0}
          />
        </div>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <img
                  src={rocket}
                  alt="Razzo"
                  width="30"
                  height="30"
                  className="badge-icon"
                  draggable="false"
                />
                <span style={{ letterSpacing: "0.5px" }}>
                  Nuovo • Completamente Gratuito
                </span>
              </div>

              <h1 className="hero-title">
                <div style={{ position: "relative" }}>
                  <TextPressure
                    text="HomeCloud!"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={false}
                    weight={true}
                    italic={true}
                    textColor="#ffffff"
                    strokeColor="#ff0000"
                    minFontSize={36}
                  />
                </div>
                <span className="title-accent">per la tua famiglia</span>
              </h1>

              <p className="hero-description">
                Trasforma il caos quotidiano in{" "}
                <ShinyText
                  text="organizzazione perfetta"
                  disabled={false}
                  speed={6}
                  className="text-highlight"
                />
                . Gestisci scadenze, documenti e appuntamenti familiari con un
                sistema intelligente che non dimentica mai nulla.
              </p>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">0€</div>
                  <div className="stat-label">Sempre gratis</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">2 min</div>
                  <div className="stat-label">Setup veloce</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">&infin;</div>
                  <div className="stat-label">Scadenze</div>
                </div>
              </div>

              <div className="hero-buttons">
                <button
                  onClick={handleRegisterClick}
                  className="hero-btn-primary"
                >
                  <span>Inizia Gratis Ora</span>
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="hero-btn-secondary"
                >
                  <span className="btn-icon">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                  <span>Scopri come funziona</span>
                </button>
              </div>

              <div className="hero-trust">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.1px",
                    fontWeight: "500",
                  }}
                >
                  <img
                    src={checkMark}
                    alt="Check Mark"
                    width="20"
                    height="20"
                    draggable="false"
                  />{" "}
                  Nessuna carta di credito{" "}
                  <img
                    src={checkMark}
                    alt="Check Mark"
                    width="20"
                    height="20"
                    draggable="false"
                  />{" "}
                  Privacy garantita{" "}
                  <img
                    src={checkMark}
                    alt="Check Mark"
                    width="20"
                    height="20"
                    draggable="false"
                  />{" "}
                  Hosting AWS sicuro
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-card card-1">
                <div className="card-icon">
                  <img
                    src={lightBulb}
                    alt="Lampadina"
                    width="40"
                    height="40"
                    draggable="false"
                  />
                </div>
                <div className="card-content">
                  <div className="card-title">Prossima Scadenza</div>
                  <div className="card-desc">Bolletta Luce • 3 giorni</div>
                </div>
                <div className="card-status status-warning"></div>
              </div>

              <div className="floating-card card-2">
                <div className="card-icon">
                  <img
                    src={hospital}
                    alt="Ospedale"
                    width="40"
                    height="40"
                    draggable="false"
                  />
                </div>
                <div className="card-content">
                  <div className="card-title">Visita Medica</div>
                  <div className="card-desc">Controllo di routine</div>
                </div>
                <div className="card-status status-success"></div>
              </div>

              <div className="floating-card card-3">
                <div className="card-icon">
                  <img
                    src={loveLetter}
                    alt="Lettera d'Amore"
                    width="40"
                    height="40"
                    draggable="false"
                  />
                </div>
                <div className="card-content">
                  <div className="card-title">Promemoria Inviato</div>
                  <div className="card-desc">Notifica automatica</div>
                </div>
                <div className="card-status status-info"></div>
              </div>
            </div>
          </div>

          {/* <div className="floating-logo" style={{ opacity: 0.5 }}>
            <img
              src={logoUrl}
              alt="HomeCloud"
              className="nav-logo-img"
              draggable="false"
            />
          </div> */}
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <SplitText
              text="Perché scegliere HomeCloud?"
              className="text-2xl font-semibold text-center activity-summary-important-text section-title"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <p className="section-subtitle">
              Tutto quello che serve per organizzare la tua famiglia
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <img
                src={calendar}
                alt="Calendario"
                width="60"
                height="60"
                draggable="false"
                className="feature-icon"
              />
              <h3>Gestione Scadenze</h3>
              <p>
                Tieni traccia di documenti, bollette, appuntamenti medici e
                tutte le scadenze importanti della famiglia
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src={email}
                  alt="Email"
                  width="60"
                  height="60"
                  draggable="false"
                  className="feature-icon"
                />
              </div>
              <h3>Notifiche Smart</h3>
              <p>
                Ricevi promemoria automatici via email per non dimenticare mai
                una scadenza importante
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src={barChart}
                  alt="Grafico a barre"
                  width="60"
                  height="60"
                  draggable="false"
                  className="feature-icon"
                />
              </div>
              <h3>Dashboard Intelligente</h3>
              <p>
                Visualizza le prossime scadenze, monitora quelle scadute e cerca
                facilmente con filtri intelligenti
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src={shield}
                  alt="Scudo"
                  width="60"
                  height="60"
                  draggable="false"
                  className="feature-icon"
                />
              </div>
              <h3>Sicurezza AWS</h3>
              <p>
                I tuoi dati sono protetti con crittografia avanzata su
                infrastruttura cloud sicura
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src={mobilePhone}
                  alt="Cellulare"
                  width="60"
                  height="60"
                  draggable="false"
                  className="feature-icon"
                />
              </div>
              <h3>Accesso Ovunque</h3>
              <p>
                Accedi ai tuoi dati da qualsiasi dispositivo, sempre
                sincronizzati e aggiornati
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src={lightning}
                  alt="Fulmine"
                  width="60"
                  height="60"
                  draggable="false"
                  className="feature-icon"
                />
              </div>
              <h3>Setup Veloce</h3>
              <p>
                Inizia in pochi minuti. Interfaccia intuitiva e configurazione
                guidata
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <SplitText
              text="Pricing Semplice"
              className="text-2xl font-semibold text-center activity-summary-important-text section-title"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <p className="section-subtitle">
              Tutto completamente gratuito per sempre
            </p>
          </div>

          <div className="pricing-badge-wrapper">
            <div className="pricing-badge">Sempre Gratis</div>
            <SpotlightCard
              className="pricing-card-spotlight"
              spotlightColor="rgba(167, 19, 246, 0.6)"
            >
              <h3 className="pricing-title">Piano Personale</h3>
              <div className="pricing-price">
                <span className="price-currency">€</span>
                <span className="price-amount">0</span>
                <span className="price-period">/mese</span>
              </div>
              <ul className="pricing-features">
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <img
                    src={checkMark}
                    alt="✓"
                    width="20"
                    height="20"
                    draggable="false"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />{" "}
                  Gestione illimitata scadenze
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <img
                    src={checkMark}
                    alt="✓"
                    width="20"
                    height="20"
                    draggable="false"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />{" "}
                  Notifiche email automatiche
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <img
                    src={checkMark}
                    alt="✓"
                    width="20"
                    height="20"
                    draggable="false"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />{" "}
                  Backup sicuro su AWS
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <img
                    src={checkMark}
                    alt="✓"
                    width="20"
                    height="20"
                    draggable="false"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />{" "}
                  Accesso da tutti i dispositivi
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.2px",
                  }}
                >
                  <img
                    src={checkMark}
                    alt="✓"
                    width="20"
                    height="20"
                    draggable="false"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />{" "}
                  Nessuna pubblicità
                </li>
              </ul>
              <button onClick={handleRegisterClick} className="pricing-btn">
                Inizia Subito
              </button>
              <p className="pricing-note">Nessuna carta di credito richiesta</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <SplitText
              text="Hai domande?"
              className="text-2xl font-semibold text-center activity-summary-important-text section-title"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <p className="section-subtitle">
              Siamo qui per aiutarti. Contattaci per qualsiasi informazione
            </p>
          </div>

          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <img
                    src={loveLetter}
                    alt="Lettera d'Amore"
                    width="35"
                    height="35"
                    draggable="false"
                  />
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:support@mail.homecloud.ninja">
                    support@mail.homecloud.ninja
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <img
                    src={hammerAndWrench}
                    alt="Martello e Chiave Inglese"
                    width="35"
                    height="35"
                    draggable="false"
                  />
                </div>
                <div>
                  <h4>Centro Assistenza</h4>
                  <p>Guide e soluzioni rapide</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <img
                    src={lightning}
                    alt="Fulmine"
                    width="35"
                    height="35"
                    draggable="false"
                  />
                </div>
                <div>
                  <h4>Risposta Rapida</h4>
                  <p>Entro 24 ore lavorative</p>
                </div>
              </div>
            </div>

            {/* Sostituisci tutto il form con questo: */}
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <SplitText
              text="Pronto ad organizzare la tua famiglia?"
              className="text-2xl font-semibold text-center activity-summary-important-text cta-title"
              delay={40}
              duration={0.5}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <p className="cta-subtitle">
              Rendi la tua vita più organizzata e serena con{" "}
              <span
                style={{
                  fontWeight: "bold",
                  letterSpacing: "0.2px",
                  color: "white",
                  opacity: 1,
                }}
              >
                HomeCloud
              </span>
              , la soluzione intelligente per te
            </p>
            <button onClick={handleRegisterClick} className="cta-btn">
              Inizia Gratis Ora
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                {footerLogoUrl && (
                  <img
                    src={footerLogoUrl}
                    alt="HomeCloud"
                    className="footer-logo-img"
                    draggable="false"
                  />
                )}
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
                    onClick={() => scrollToSection("hero")}
                    className="footer-link"
                  >
                    Home
                  </button>
                </li>
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
                  <a
                    href="mailto:support@mail.homecloud.ninja"
                    className="footer-link"
                  >
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
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 HomeCloud. Tutti i diritti riservati.</p>
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
