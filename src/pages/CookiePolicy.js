import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CookiePolicy.css";
import { getSpecificLogo } from "../helpers/logoHelper";

const CookiePolicy = () => {
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
    <div className="cookie-policy-page">
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

      <main className="cookie-content">
        <div className="container">
          <header className="cookie-header">
            <h1>Cookie Policy</h1>
            <p className="last-updated">Ultimo aggiornamento: 25 Giugno 2025</p>
          </header>

          <div className="cookie-sections">
            <section className="cookie-section">
              <h2>1. Che cosa sono i Cookie</h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul
                tuo dispositivo (computer, tablet, smartphone) quando visiti un
                sito web. Permettono al sito di riconoscerti durante la
                navigazione e di memorizzare alcune informazioni sulle tue
                preferenze.
              </p>
              <div className="cookie-definition">
                <h3>Tipi di Cookie per durata:</h3>
                <ul>
                  <li>
                    <strong>Cookie di sessione:</strong> Vengono eliminati
                    quando chiudi il browser
                  </li>
                  <li>
                    <strong>Cookie persistenti:</strong> Rimangono memorizzati
                    per un periodo determinato
                  </li>
                </ul>
                <h3>Tipi di Cookie per origine:</h3>
                <ul>
                  <li>
                    <strong>Cookie di prima parte:</strong> Impostati
                    direttamente da HomeCloud
                  </li>
                  <li>
                    <strong>Cookie di terze parti:</strong> Impostati da servizi
                    esterni che utilizziamo
                  </li>
                </ul>
              </div>
            </section>

            <section className="cookie-section">
              <h2>2. Come HomeCloud utilizza i Cookie</h2>
              <p>
                HomeCloud utilizza i cookie per garantire il corretto
                funzionamento della piattaforma e per migliorare la tua
                esperienza di utilizzo. Di seguito trovi una panoramica
                dettagliata di tutti i cookie utilizzati.
              </p>
            </section>

            <section className="cookie-section">
              <h2>3. Cookie Tecnici Essenziali</h2>
              <div className="cookie-category">
                <p>
                  Questi cookie sono strettamente necessari per il funzionamento
                  di HomeCloud e non possono essere disabilitati. Senza questi
                  cookie, il servizio non funzionerebbe correttamente.
                </p>

                <div className="cookie-list">
                  <div className="cookie-item">
                    <h3>Cookie di Autenticazione AWS Cognito</h3>
                    <div className="cookie-details">
                      <p>
                        <strong>Finalità:</strong> Gestione dell'autenticazione
                        utente e mantenimento della sessione di login
                      </p>
                      <p>
                        <strong>Durata:</strong> 30 giorni
                      </p>
                      <p>
                        <strong>Tipo:</strong> Cookie essenziale di prima parte
                      </p>
                      <p>
                        <strong>Nomi dei cookie:</strong>
                      </p>
                      <ul>
                        <li>
                          <code>CognitoIdentityServiceProvider.*</code>
                        </li>
                        <li>
                          <code>amplify-*</code>
                        </li>
                        <li>
                          <code>LastAuthUser</code>
                        </li>
                      </ul>
                      <p>
                        <strong>Informazioni memorizzate:</strong> Token di
                        accesso crittografati, informazioni di sessione
                      </p>
                    </div>
                  </div>

                  <div className="cookie-item">
                    <h3>Cookie di Sessione Locale</h3>
                    <div className="cookie-details">
                      <p>
                        <strong>Finalità:</strong> Mantenimento dello stato
                        dell'applicazione durante la navigazione
                      </p>
                      <p>
                        <strong>Durata:</strong> Sessione (eliminati alla
                        chiusura del browser)
                      </p>
                      <p>
                        <strong>Tipo:</strong> Cookie essenziale di prima parte
                      </p>
                      <p>
                        <strong>Informazioni memorizzate:</strong> Preferenze
                        temporanee di visualizzazione, stato di navigazione
                      </p>
                    </div>
                  </div>

                  <div className="cookie-item">
                    <h3>Cookie di Sicurezza</h3>
                    <div className="cookie-details">
                      <p>
                        <strong>Finalità:</strong> Protezione contro attacchi
                        CSRF e mantenimento della sicurezza
                      </p>
                      <p>
                        <strong>Durata:</strong> Sessione
                      </p>
                      <p>
                        <strong>Tipo:</strong> Cookie essenziale di prima parte
                      </p>
                      <p>
                        <strong>Informazioni memorizzate:</strong> Token di
                        sicurezza, identificatori di sessione
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>4. Cookie di Terze Parti</h2>
              <div className="cookie-category">
                <p>
                  HomeCloud utilizza alcuni servizi di terze parti che possono
                  impostare i propri cookie. Questi servizi sono selezionati per
                  migliorare la funzionalità e l'esperienza utente della nostra
                  piattaforma.
                </p>

                <div className="cookie-list">
                  <div className="cookie-item">
                    <h3>Google Fonts</h3>
                    <div className="cookie-details">
                      <p>
                        <strong>Provider:</strong> Google LLC
                      </p>
                      <p>
                        <strong>Finalità:</strong> Caricamento dei caratteri
                        tipografici utilizzati nel design di HomeCloud
                      </p>
                      <p>
                        <strong>Durata:</strong> Varia (controllata da Google)
                      </p>
                      <p>
                        <strong>Tipo:</strong> Cookie tecnico di terze parti
                      </p>
                      <p>
                        <strong>Privacy Policy:</strong>{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://policies.google.com/privacy
                        </a>
                      </p>
                      <p>
                        <strong>Informazioni memorizzate:</strong> Preferenze di
                        visualizzazione dei font, cache dei caratteri
                      </p>
                    </div>
                  </div>

                  <div className="cookie-item">
                    <h3>Amazon Web Services (AWS)</h3>
                    <div className="cookie-details">
                      <p>
                        <strong>Provider:</strong> Amazon Web Services, Inc.
                      </p>
                      <p>
                        <strong>Finalità:</strong> Hosting dell'applicazione e
                        gestione dell'infrastruttura cloud
                      </p>
                      <p>
                        <strong>Durata:</strong> Varia secondo le policy AWS
                      </p>
                      <p>
                        <strong>Tipo:</strong> Cookie tecnico di terze parti
                      </p>
                      <p>
                        <strong>Privacy Policy:</strong>{" "}
                        <a
                          href="https://aws.amazon.com/privacy/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://aws.amazon.com/privacy/
                        </a>
                      </p>
                      <p>
                        <strong>Informazioni memorizzate:</strong> Dati di
                        routing, bilanciamento del carico, identificazione
                        geografica
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>5. Cookie che NON utilizziamo</h2>
              <div className="no-cookies-info">
                <p>
                  Per garantire la massima privacy degli utenti, HomeCloud
                  <strong> NON utilizza</strong> i seguenti tipi di cookie:
                </p>
                <ul>
                  <li>
                    <strong>Cookie di tracciamento pubblicitario:</strong> Non
                    mostriamo pubblicità e non tracciamo gli utenti a scopi
                    commerciali
                  </li>
                  <li>
                    <strong>Cookie di profilazione:</strong> Non creiamo profili
                    comportamentali degli utenti
                  </li>
                  <li>
                    <strong>Cookie di analytics invasivi:</strong> Non
                    utilizziamo Google Analytics o servizi simili che raccolgono
                    dati dettagliati
                  </li>
                  <li>
                    <strong>Cookie di social media:</strong> Non abbiamo
                    integrazione con social network che possono tracciare gli
                    utenti
                  </li>
                  <li>
                    <strong>Cookie di marketing:</strong> Non facciamo
                    remarketing o tracciamento per finalità commerciali
                  </li>
                </ul>
                <div className="privacy-commitment">
                  <p>
                    <strong>Il nostro impegno:</strong> HomeCloud è progettato
                    con la privacy al centro. Utilizziamo solo i cookie
                    strettamente necessari per il funzionamento del servizio.
                  </p>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>6. Gestione dei Cookie</h2>
              <div className="cookie-management">
                <div className="management-info">
                  <h3>6.1 Cookie Essenziali</h3>
                  <p>
                    I cookie tecnici essenziali non possono essere disabilitati
                    in quanto necessari per il funzionamento di HomeCloud. La
                    disabilitazione di questi cookie comporterebbe
                    l'impossibilità di utilizzare il servizio.
                  </p>
                </div>

                <div className="management-info">
                  <h3>6.2 Controllo tramite Browser</h3>
                  <p>
                    Puoi gestire le preferenze sui cookie direttamente dalle
                    impostazioni del tuo browser. Ecco come fare per i browser
                    più comuni:
                  </p>

                  <div className="browser-instructions">
                    <div className="browser-item">
                      <h4>Google Chrome</h4>
                      <ol>
                        <li>Clicca sui tre puntini in alto a destra</li>
                        <li>Vai su "Impostazioni" → "Privacy e sicurezza"</li>
                        <li>Clicca su "Cookie e altri dati dei siti"</li>
                        <li>Configura le tue preferenze</li>
                      </ol>
                    </div>

                    <div className="browser-item">
                      <h4>Mozilla Firefox</h4>
                      <ol>
                        <li>Clicca sul menu (tre linee) in alto a destra</li>
                        <li>Vai su "Impostazioni" → "Privacy e sicurezza"</li>
                        <li>Nella sezione "Cookie e dati dei siti web"</li>
                        <li>Configura le tue preferenze</li>
                      </ol>
                    </div>

                    <div className="browser-item">
                      <h4>Safari</h4>
                      <ol>
                        <li>Vai su "Safari" → "Preferenze"</li>
                        <li>Clicca sulla scheda "Privacy"</li>
                        <li>Configura le impostazioni dei cookie</li>
                      </ol>
                    </div>

                    <div className="browser-item">
                      <h4>Microsoft Edge</h4>
                      <ol>
                        <li>Clicca sui tre puntini in alto a destra</li>
                        <li>
                          Vai su "Impostazioni" → "Cookie e autorizzazioni sito"
                        </li>
                        <li>Clicca su "Cookie e dati archiviati"</li>
                        <li>Configura le tue preferenze</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="management-info">
                  <h3>6.3 Modalità Privata/Incognito</h3>
                  <p>
                    Utilizzando la modalità privata o incognito del tuo browser,
                    i cookie verranno eliminati automaticamente al termine della
                    sessione di navigazione.
                  </p>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>7. Conseguenze della Disabilitazione</h2>
              <div className="consequences-info">
                <div className="consequence-item">
                  <h3>Disabilitazione dei Cookie Essenziali</h3>
                  <p>La disabilitazione dei cookie essenziali comporterà:</p>
                  <ul>
                    <li>Impossibilità di effettuare il login</li>
                    <li>Perdita della sessione ad ogni cambio di pagina</li>
                    <li>Malfunzionamento delle funzionalità principali</li>
                    <li>Possibili problemi di sicurezza</li>
                  </ul>
                </div>

                <div className="consequence-item">
                  <h3>Disabilitazione dei Cookie di Terze Parti</h3>
                  <p>
                    La disabilitazione dei cookie di terze parti potrebbe
                    comportare:
                  </p>
                  <ul>
                    <li>
                      Problemi nella visualizzazione dei caratteri (Google
                      Fonts)
                    </li>
                    <li>Possibili rallentamenti nel caricamento</li>
                    <li>Aspetto grafico leggermente alterato</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>8. Aggiornamenti e Modifiche</h2>
              <div className="updates-info">
                <p>
                  Questa Cookie Policy può essere aggiornata periodicamente per
                  riflettere:
                </p>
                <ul>
                  <li>Modifiche alle tecnologie utilizzate</li>
                  <li>Aggiornamenti normativi</li>
                  <li>Miglioramenti al servizio</li>
                  <li>Integrazione di nuovi servizi di terze parti</li>
                </ul>
                <div className="notification-info">
                  <h3>Notifica delle Modifiche</h3>
                  <p>
                    Gli utenti saranno informati di modifiche significative
                    tramite:
                  </p>
                  <ul>
                    <li>Notifica via email</li>
                    <li>Avviso nella piattaforma</li>
                    <li>Aggiornamento della data in cima a questa pagina</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>9. Base Legale e Consenso</h2>
              <div className="legal-basis">
                <div className="legal-item">
                  <h3>9.1 Cookie Tecnici Essenziali</h3>
                  <p>
                    I cookie tecnici essenziali sono utilizzati sulla base dell'
                    <strong>interesse legittimo</strong> di fornire il servizio
                    richiesto dall'utente. Non è necessario il consenso per
                    questi cookie secondo l'art. 122 del Codice Privacy
                    italiano.
                  </p>
                </div>

                <div className="legal-item">
                  <h3>9.2 Cookie di Terze Parti</h3>
                  <p>
                    I cookie di terze parti utilizzati (Google Fonts, AWS) sono
                    anch'essi considerati tecnici in quanto necessari per il
                    corretto funzionamento e visualizzazione del servizio.
                  </p>
                </div>

                <div className="legal-item">
                  <h3>9.3 Diritti dell'Utente</h3>
                  <p>L'utente ha il diritto di:</p>
                  <ul>
                    <li>
                      Essere informato sull'utilizzo dei cookie (tramite questa
                      policy)
                    </li>
                    <li>Gestire le preferenze tramite il browser</li>
                    <li>Richiedere informazioni sui dati raccolti</li>
                    <li>
                      Richiedere la cancellazione dei dati (secondo le modalità
                      della Privacy Policy)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>10. Riferimenti Normativi</h2>
              <div className="legal-references">
                <div className="reference-item">
                  <h3>Normativa Europea</h3>
                  <ul>
                    <li>
                      <strong>GDPR (Regolamento UE 2016/679):</strong>{" "}
                      Protezione dei dati personali
                    </li>
                    <li>
                      <strong>Direttiva ePrivacy (2002/58/CE):</strong> Privacy
                      nelle comunicazioni elettroniche
                    </li>
                  </ul>
                </div>

                <div className="reference-item">
                  <h3>Normativa Italiana</h3>
                  <ul>
                    <li>
                      <strong>Codice Privacy (D.Lgs. 196/2003):</strong> Come
                      modificato dal D.Lgs. 101/2018
                    </li>
                    <li>
                      <strong>Art. 122:</strong> Informazioni nell'apparecchio
                      terminale dell'abbonato o dell'utente
                    </li>
                  </ul>
                </div>

                <div className="reference-item">
                  <h3>Linee Guida delle Autorità</h3>
                  <ul>
                    <li>
                      <strong>Garante Privacy Italiano:</strong> Linee guida sui
                      cookie (2021)
                    </li>
                    <li>
                      <strong>EDPB (European Data Protection Board):</strong>{" "}
                      Guidelines sui cookie
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>11. Risorse Utili</h2>
              <div className="useful-resources">
                <div className="resource-category">
                  <h3>Informazioni sui Cookie</h3>
                  <ul>
                    <li>
                      <a
                        href="https://allaboutcookies.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        AllAboutCookies.org
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youronlinechoices.com/it/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Your Online Choices (IT)
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="resource-category">
                  <h3>Guide Browser</h3>
                  <ul>
                    <li>
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chrome - Gestione cookie
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Firefox - Gestione cookie
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Safari - Gestione cookie
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.microsoft.com/it-it/windows/eliminare-e-gestire-i-cookie-168dab11-0753-043d-7c16-ede5947fc64d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Edge - Gestione cookie
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="resource-category">
                  <h3>Autorità di Controllo</h3>
                  <ul>
                    <li>
                      <a
                        href="https://www.garanteprivacy.it/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Garante per la Protezione dei Dati Personali (Italia)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://edpb.europa.eu/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        European Data Protection Board
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>12. Contatti</h2>
              <div className="contact-section">
                <p>
                  Per domande o richieste relative a questa Cookie Policy o
                  all'utilizzo dei cookie su HomeCloud, puoi contattarci:
                </p>
                <div className="contact-details">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:support@mail.homecloud.ninja">
                      support@mail.homecloud.ninja
                    </a>
                  </p>
                  <p>
                    <strong>Oggetto:</strong> "Cookie Policy - [Tua richiesta]"
                  </p>
                </div>
                <p>
                  Risponderemo alle tue richieste entro 30 giorni, come previsto
                  dalla normativa vigente.
                </p>
                <div className="related-policies">
                  <h3>Documenti Correlati</h3>
                  <ul>
                    <li>
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/terms-conditions">Termini e Condizioni</Link>
                    </li>
                    <li>
                      <Link to="/unsubscribe">Gestione Invio Email</Link>
                    </li>
                  </ul>
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

export default CookiePolicy;
