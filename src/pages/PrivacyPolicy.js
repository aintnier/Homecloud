import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/PrivacyPolicy.css";
import { getSpecificLogo } from "../helpers/logoHelper";

const PrivacyPolicy = () => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const logo = await getSpecificLogo("Logo-2.1.1");
        setLogoUrl(logo);
      } catch (error) {
        console.error("Error loading logo:", error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <div className="privacy-policy-page">
      <nav className="simple-nav">
        <div className="nav-container">
          <Link to="/landing" className="nav-logo-link">
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
          <Link to="/landing" className="back-link">
            ← Torna alla Home
          </Link>
        </div>
      </nav>

      <main className="privacy-content">
        <div className="container">
          <header className="privacy-header">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Ultimo aggiornamento: 25 Giugno 2025</p>
          </header>

          <div className="privacy-sections">
            <section className="privacy-section">
              <h2>1. Chi siamo</h2>
              <p>
                HomeCloud è una piattaforma di gestione familiare sviluppata e
                gestita da <strong>Ernesto Cervadoro</strong> (di seguito "noi",
                "nostro" o "HomeCloud"). Siamo il titolare del trattamento dei
                tuoi dati personali in conformità al Regolamento Generale sulla
                Protezione dei Dati (GDPR) e alla normativa italiana sulla
                privacy.
              </p>
              <div className="contact-info">
                <p>
                  <strong>Contatti del Titolare:</strong>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:support@mail.homecloud.ninja">
                    support@mail.homecloud.ninja
                  </a>
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>2. Quali dati raccogliamo</h2>
              <div className="data-categories">
                <div className="data-category">
                  <h3>2.1 Dati anagrafici e di contatto</h3>
                  <ul>
                    <li>Nome completo</li>
                    <li>Indirizzo email</li>
                    <li>Password (crittografata tramite AWS Cognito)</li>
                    <li>Immagine del profilo (avatar predefinito)</li>
                  </ul>
                </div>

                <div className="data-category">
                  <h3>2.2 Dati delle scadenze</h3>
                  <ul>
                    <li>
                      Titoli e descrizioni delle scadenze personali/familiari
                    </li>
                    <li>Date di scadenza</li>
                    <li>
                      Categorie (casa, salute, documenti, lavoro, personale,
                      altro)
                    </li>
                    <li>Preferenze di notifica per ogni scadenza</li>
                  </ul>
                </div>

                <div className="data-category">
                  <h3>2.3 Dati di autenticazione</h3>
                  <ul>
                    <li>Token di autenticazione gestiti da AWS Cognito</li>
                    <li>Dati di sessione</li>
                    <li>Log di accesso per sicurezza</li>
                  </ul>
                </div>

                <div className="data-category">
                  <h3>2.4 Preferenze utente</h3>
                  <ul>
                    <li>Impostazioni di notifica email (attiva/disattiva)</li>
                    <li>Frequenza delle notifiche</li>

                    {/* se in futuro emplemento toggle dark/light mode */}
                    {/* <li>Preferenze di visualizzazione</li>  */}
                  </ul>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>3. Come utilizziamo i tuoi dati</h2>
              <div className="usage-purposes">
                <div className="usage-item">
                  <h3>3.1 Finalità principali</h3>
                  <ul>
                    <li>
                      <strong>Gestione account:</strong> Creazione e
                      mantenimento del tuo account utente
                    </li>
                    <li>
                      <strong>Servizio di promemoria:</strong> Invio di email
                      automatiche per le scadenze
                    </li>
                    <li>
                      <strong>Autenticazione:</strong> Gestione sicura
                      dell'accesso tramite AWS Cognito
                    </li>
                    <li>
                      <strong>Personalizzazione:</strong> Adattamento
                      dell'esperienza alle tue preferenze
                    </li>
                  </ul>
                </div>

                <div className="usage-item">
                  <h3>3.2 Base giuridica</h3>
                  <p>
                    Il trattamento dei tuoi dati è basato sul{" "}
                    <strong>consenso</strong> che fornisci al momento della
                    registrazione e sull'
                    <strong>esecuzione del contratto</strong> per la fornitura
                    del servizio HomeCloud.
                  </p>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>4. Come proteggiamo i tuoi dati</h2>
              <div className="security-measures">
                <div className="security-item">
                  <h3>4.1 Misure tecniche</h3>
                  <ul>
                    <li>
                      <strong>Crittografia:</strong> Tutti i dati sono
                      crittografati in transito (HTTPS) e a riposo
                    </li>
                    <li>
                      <strong>AWS Security:</strong> Utilizziamo
                      l'infrastruttura sicura di Amazon Web Services
                    </li>
                    <li>
                      <strong>Autenticazione sicura:</strong> Gestione password
                      tramite AWS Cognito con standard di sicurezza enterprise
                    </li>
                    <li>
                      <strong>Accesso limitato:</strong> Solo il personale
                      autorizzato può accedere ai sistemi
                    </li>
                  </ul>
                </div>

                <div className="security-item">
                  <h3>4.2 Misure organizzative</h3>
                  <ul>
                    <li>Controlli di accesso rigorosi</li>
                    <li>Monitoraggio continuo dei sistemi</li>
                    <li>Backup automatici e sicuri</li>
                    <li>Aggiornamenti di sicurezza regolari</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>5. Condivisione dei dati</h2>
              <div className="sharing-info">
                <p>
                  <strong>
                    I tuoi dati non vengono venduti o condivisi con terze parti
                    per scopi commerciali.
                  </strong>
                </p>
                <p>Condividiamo i dati solo nei seguenti casi limitati:</p>
                <ul>
                  <li>
                    <strong>Provider di servizi:</strong> AWS per hosting e
                    gestione dell'infrastruttura
                  </li>
                  <li>
                    <strong>Servizi email:</strong> Amazon SES per l'invio delle
                    notifiche
                  </li>
                  <li>
                    <strong>Obblighi legali:</strong> Se richiesto dalla legge o
                    da autorità competenti
                  </li>
                </ul>
              </div>
            </section>

            <section className="privacy-section">
              <h2>6. Conservazione dei dati</h2>
              <div className="retention-info">
                <ul>
                  <li>
                    <strong>Dati dell'account:</strong> Conservati finché
                    mantieni il tuo account attivo
                  </li>
                  <li>
                    <strong>Dati delle scadenze:</strong> Conservati secondo le
                    tue preferenze di utilizzo
                  </li>
                  <li>
                    <strong>Log di sicurezza:</strong> Conservati per massimo 12
                    mesi
                  </li>
                  <li>
                    <strong>Dopo cancellazione account:</strong> Tutti i dati
                    vengono eliminati entro 30 giorni
                  </li>
                </ul>
              </div>
            </section>

            <section className="privacy-section">
              <h2>7. I tuoi diritti</h2>
              <div className="rights-info">
                <p>Secondo il GDPR, hai i seguenti diritti:</p>
                <div className="rights-grid">
                  <div className="right-item">
                    <h3>Accesso</h3>
                    <p>Richiedere una copia dei tuoi dati personali</p>
                  </div>
                  <div className="right-item">
                    <h3>Rettifica</h3>
                    <p>Correggere dati inesatti o incompleti</p>
                  </div>
                  <div className="right-item">
                    <h3>Cancellazione</h3>
                    <p>Richiedere la cancellazione dei tuoi dati</p>
                  </div>
                  <div className="right-item">
                    <h3>Portabilità</h3>
                    <p>Ricevere i tuoi dati in formato strutturato</p>
                  </div>
                  <div className="right-item">
                    <h3>Opposizione</h3>
                    <p>Opporti al trattamento per finalità specifiche</p>
                  </div>
                  <div className="right-item">
                    <h3>Limitazione</h3>
                    <p>Richiedere la limitazione del trattamento</p>
                  </div>
                </div>
                <p className="rights-note">
                  Per esercitare questi diritti, contattaci all'indirizzo:{" "}
                  <a href="mailto:support@mail.homecloud.ninja">
                    support@mail.homecloud.ninja
                  </a>
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>8. Cookie e tecnologie simili</h2>
              <div className="cookies-info">
                <p>
                  Per informazioni dettagliate sui cookie utilizzati da
                  HomeCloud, consulta la nostra{" "}
                  <Link to="/cookie-policy" className="policy-link">
                    Cookie Policy
                  </Link>
                  , che spiega:
                </p>
                <ul>
                  <li>Tipologie di cookie utilizzati</li>
                  <li>Finalità di ogni cookie</li>
                  <li>Come gestire le preferenze</li>
                  <li>Diritti dell'utente</li>
                </ul>
              </div>
            </section>

            <section className="privacy-section">
              <h2>9. Trasferimenti internazionali</h2>
              <div className="transfers-info">
                <p>
                  I tuoi dati sono archiviati sui server AWS nella regione
                  Europa (eu-north-1 - Stoccolma), garantendo la conformità con
                  le normative europee sulla protezione dei dati.
                </p>
                <p>
                  AWS è certificato per diversi standard di sicurezza
                  internazionali e rispetta i requisiti del GDPR per il
                  trasferimento di dati.
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>10. Modifiche alla Privacy Policy</h2>
              <div className="changes-info">
                <p>
                  Ci riserviamo il diritto di aggiornare questa Privacy Policy
                  per riflettere cambiamenti nel nostro servizio o nella
                  normativa applicabile.
                </p>
                <p>
                  Le modifiche significative verranno comunicate tramite email o
                  attraverso notifiche nella piattaforma. La data dell'ultimo
                  aggiornamento è sempre indicata in cima a questa pagina.
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>11. Contatti</h2>
              <div className="contact-section">
                <p>
                  Per qualsiasi domanda relativa a questa Privacy Policy o al
                  trattamento dei tuoi dati personali, puoi contattarci:
                </p>
                <div className="contact-details">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:support@mail.homecloud.ninja">
                      support@mail.homecloud.ninja
                    </a>
                  </p>
                  <p>
                    <strong>Oggetto:</strong> "Richiesta Privacy - [Tua
                    richiesta]"
                  </p>
                </div>
                <p>
                  Ti risponderemo entro 30 giorni dalla ricezione della tua
                  richiesta, come previsto dal GDPR.
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>12. Documenti Correlati</h2>
              <div className="related-documents">
                <p>
                  Questa Privacy Policy fa parte di un insieme di documenti che
                  regolano l'utilizzo di HomeCloud:
                </p>

                <div className="documents-grid">
                  <div className="document-item">
                    <h3>
                      <Link to="/terms-conditions" className="policy-link">
                        Termini e Condizioni
                      </Link>
                    </h3>
                    <p>
                      Definiscono i diritti e doveri nell'utilizzo del servizio,
                      limitazioni di responsabilità e condizioni generali.
                    </p>
                  </div>

                  <div className="document-item">
                    <h3>
                      <Link to="/cookie-policy" className="policy-link">
                        Cookie Policy
                      </Link>
                    </h3>
                    <p>
                      Informazioni dettagliate sui cookie utilizzati, loro
                      finalità e come gestire le preferenze.
                    </p>
                  </div>

                  <div className="document-item">
                    <h3>
                      <Link to="/unsubscribe" className="policy-link">
                        Gestione Invio Email
                      </Link>
                    </h3>
                    <p>
                      Come disattivare le notifiche email e gestire le
                      preferenze di comunicazione.
                    </p>
                  </div>
                </div>

                <div className="integration-note">
                  <p>
                    <strong>Importante:</strong> Tutti questi documenti si
                    integrano e devono essere letti insieme per una comprensione
                    completa dei tuoi diritti e delle nostre responsabilità.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="simple-footer">
        <div className="container">
          <p>&copy; 2025 HomeCloud. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
