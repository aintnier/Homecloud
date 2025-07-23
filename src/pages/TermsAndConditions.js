import React from "react";
import { Link } from "react-router-dom";
import "../styles/TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-conditions-page">
      <nav className="simple-nav">
        <div className="nav-container">
          <Link to="/landing" className="back-link">
            Torna alla Home
          </Link>
        </div>
      </nav>

      <main className="terms-content">
        <div className="container">
          <header className="terms-header">
            <h1>Termini e Condizioni</h1>
            <p className="last-updated">Ultimo aggiornamento: 25 Giugno 2025</p>
          </header>

          <div className="terms-sections">
            <section className="terms-section">
              <h2>1. Accettazione dei Termini</h2>
              <p>
                Benvenuto su <strong>HomeCloud</strong>. Utilizzando la nostra
                piattaforma, accetti di rispettare e di essere vincolato dai
                presenti Termini e Condizioni di Utilizzo. Se non accetti questi
                termini, ti preghiamo di non utilizzare il nostro servizio.
              </p>
              <div className="important-notice">
                <p>
                  <strong>Importante:</strong> Questi termini costituiscono un
                  accordo legalmente vincolante tra te e HomeCloud. Leggili
                  attentamente.
                </p>
              </div>
            </section>

            <section className="terms-section">
              <h2>2. Descrizione del Servizio</h2>
              <div className="service-description">
                <div className="service-item">
                  <h3>2.1 Che cos'è HomeCloud</h3>
                  <p>
                    HomeCloud è una piattaforma web gratuita per la gestione
                    delle scadenze familiari e personali. Il servizio permette
                    di:
                  </p>
                  <ul>
                    <li>Creare e gestire scadenze personalizzate</li>
                    <li>Ricevere notifiche email automatiche</li>
                    <li>Organizzare scadenze per categoria</li>
                    <li>Monitorare lo stato delle proprie scadenze</li>
                    <li>Accedere ai dati da qualsiasi dispositivo</li>
                  </ul>
                </div>

                <div className="service-item">
                  <h3>2.2 Natura del Servizio</h3>
                  <p>
                    HomeCloud è fornito <strong>gratuitamente</strong> come
                    servizio di utilità per la gestione personale. Non è un
                    servizio critico o essenziale e non sostituisce sistemi
                    professionali di gestione aziendale.
                  </p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>3. Condizioni di Utilizzo</h2>
              <div className="usage-conditions">
                <div className="condition-item">
                  <h3>3.1 Uso Consentito</h3>
                  <ul>
                    <li>
                      <strong>Uso personale e familiare:</strong> Il servizio è
                      destinato esclusivamente all'uso personale e familiare
                    </li>
                    <li>
                      <strong>Dati veritieri:</strong> Fornire informazioni
                      accurate durante la registrazione
                    </li>
                    <li>
                      <strong>Sicurezza account:</strong> Mantenere riservate le
                      credenziali di accesso
                    </li>
                    <li>
                      <strong>Conformità legale:</strong> Utilizzare il servizio
                      nel rispetto delle leggi vigenti
                    </li>
                  </ul>
                </div>

                <div className="condition-item">
                  <h3>3.2 Uso Vietato</h3>
                  <p>È espressamente vietato:</p>
                  <ul>
                    <li>
                      Utilizzare il servizio per scopi commerciali senza
                      autorizzazione
                    </li>
                    <li>
                      Tentare di violare la sicurezza o l'integrità del sistema
                    </li>
                    <li>Interferire con il funzionamento del servizio</li>
                    <li>
                      Utilizzare script automatizzati o bot non autorizzati
                    </li>
                    <li>Condividere o rivendere l'accesso al servizio</li>
                    <li>
                      Inserire contenuti illegali, offensivi o inappropriati
                    </li>
                    <li>Tentare di accedere ai dati di altri utenti</li>
                  </ul>
                </div>

                <div className="condition-item">
                  <h3>3.3 Responsabilità dell'Utente</h3>
                  <p>L'utente è responsabile di:</p>
                  <ul>
                    <li>
                      Mantenere aggiornate le proprie informazioni di contatto
                    </li>
                    <li>Verificare l'accuratezza dei dati inseriti</li>
                    <li>Fare backup dei propri dati importanti</li>
                    <li>
                      Segnalare tempestivamente eventuali problemi di sicurezza
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>4. Limitazioni di Responsabilità</h2>
              <div className="liability-limitations">
                <div className="liability-item">
                  <h3>4.1 Servizio "Così Com'è"</h3>
                  <p>
                    HomeCloud è fornito <strong>"così com'è"</strong> e{" "}
                    <strong>"come disponibile"</strong>, senza garanzie di alcun
                    tipo, esplicite o implicite. Non garantiamo che il servizio:
                  </p>
                  <ul>
                    <li>Sia sempre disponibile o privo di interruzioni</li>
                    <li>Sia completamente privo di errori o bug</li>
                    <li>Soddisfi specifiche esigenze dell'utente</li>
                    <li>Funzioni con tutti i dispositivi o browser</li>
                  </ul>
                </div>

                <div className="liability-item">
                  <h3>4.2 Limitazioni Specifiche</h3>
                  <ul>
                    <li>
                      <strong>Accuratezza dei Dati:</strong> Non siamo
                      responsabili dell'accuratezza delle informazioni inserite
                      dagli utenti
                    </li>
                    <li>
                      <strong>Notifiche Email:</strong> Non garantiamo la
                      consegna tempestiva o l'affidabilità delle notifiche email
                    </li>
                    <li>
                      <strong>Perdita di Dati:</strong> Sebbene implementiamo
                      misure di backup, non siamo responsabili per eventuali
                      perdite di dati
                    </li>
                    <li>
                      <strong>Decisioni dell'Utente:</strong> Non siamo
                      responsabili per decisioni prese basandosi sui dati del
                      servizio
                    </li>
                  </ul>
                </div>

                <div className="liability-item">
                  <h3>4.3 Esclusioni di Responsabilità</h3>
                  <p>
                    In nessun caso HomeCloud sarà responsabile per danni
                    diretti, indiretti, incidentali, consequenziali o punitivi
                    derivanti dall'uso o dall'impossibilità di utilizzare il
                    servizio, inclusi ma non limitati a:
                  </p>
                  <ul>
                    <li>Perdite economiche o di profitto</li>
                    <li>Perdita di dati o informazioni</li>
                    <li>Interruzione di attività</li>
                    <li>Danno alla reputazione</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>5. Modifiche, Sospensione e Cessazione</h2>
              <div className="service-changes">
                <div className="change-item">
                  <h3>5.1 Modifiche al Servizio</h3>
                  <p>
                    Ci riserviamo il diritto di modificare, aggiornare o
                    migliorare HomeCloud in qualsiasi momento. Le modifiche
                    significative saranno comunicate agli utenti tramite:
                  </p>
                  <ul>
                    <li>Notifiche email</li>
                    <li>Avvisi nella piattaforma</li>
                    <li>Aggiornamenti sui nostri canali ufficiali</li>
                  </ul>
                </div>

                <div className="change-item">
                  <h3>5.2 Sospensione del Servizio</h3>
                  <p>Possiamo sospendere temporaneamente il servizio per:</p>
                  <ul>
                    <li>Manutenzione programmata</li>
                    <li>Aggiornamenti di sicurezza</li>
                    <li>Risoluzione di problemi tecnici</li>
                    <li>Violazioni dei termini di utilizzo</li>
                  </ul>
                  <p>
                    Cercheremo di fornire un preavviso ragionevole per la
                    manutenzione programmata.
                  </p>
                </div>

                <div className="change-item">
                  <h3>5.3 Cessazione del Servizio</h3>
                  <p>
                    Ci riserviamo il diritto di cessare il servizio HomeCloud
                    con un preavviso di <strong>30 giorni</strong>. In caso di
                    cessazione:
                  </p>
                  <ul>
                    <li>Forniremo strumenti per l'esportazione dei dati</li>
                    <li>
                      Invieremo notifiche via email a tutti gli utenti
                      registrati
                    </li>
                    <li>
                      Manterremo l'accesso ai dati per il periodo di preavviso
                    </li>
                  </ul>
                </div>

                <div className="change-item">
                  <h3>5.4 Chiusura Account Utente</h3>
                  <p>
                    Possiamo sospendere o chiudere un account utente in caso di:
                  </p>
                  <ul>
                    <li>Violazione dei presenti termini</li>
                    <li>Attività sospette o fraudolente</li>
                    <li>Richiesta dell'utente</li>
                    <li>Inattività prolungata (oltre 2 anni)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>6. Proprietà Intellettuale</h2>
              <div className="intellectual-property">
                <div className="ip-item">
                  <h3>6.1 Diritti di HomeCloud</h3>
                  <p>
                    Tutti i diritti di proprietà intellettuale relativi a
                    HomeCloud, inclusi ma non limitati a:
                  </p>
                  <ul>
                    <li>Design, grafica e layout della piattaforma</li>
                    <li>Codice sorgente e architettura software</li>
                    <li>Logo, marchi e denominazioni</li>
                    <li>Contenuti e documentazione</li>
                  </ul>
                  <p>
                    rimangono di proprietà esclusiva di HomeCloud e sono
                    protetti dalle leggi sulla proprietà intellettuale.
                  </p>
                </div>

                <div className="ip-item">
                  <h3>6.2 Diritti dell'Utente sui Propri Dati</h3>
                  <p>
                    L'utente mantiene tutti i diritti sui dati che inserisce in
                    HomeCloud, inclusi:
                  </p>
                  <ul>
                    <li>Titoli e descrizioni delle scadenze</li>
                    <li>Informazioni personali fornite</li>
                    <li>Preferenze e configurazioni</li>
                  </ul>
                  <p>
                    HomeCloud non rivendica alcun diritto di proprietà sui
                    contenuti degli utenti.
                  </p>
                </div>

                <div className="ip-item">
                  <h3>6.3 Licenza d'Uso</h3>
                  <p>
                    Concediamo all'utente una licenza limitata, non esclusiva,
                    non trasferibile per utilizzare HomeCloud esclusivamente per
                    i fini previsti e in conformità con questi termini.
                  </p>
                </div>

                <div className="ip-item">
                  <h3>6.4 Tecnologie di Terze Parti</h3>
                  <p>
                    HomeCloud utilizza tecnologie e servizi di terze parti,
                    inclusi:
                  </p>
                  <ul>
                    <li>
                      <strong>AWS (Amazon Web Services):</strong> Per hosting e
                      infrastruttura
                    </li>
                    <li>
                      <strong>Google Fonts:</strong> Per i caratteri tipografici
                    </li>
                    <li>
                      <strong>FontAwesome e OpenMoji:</strong> Per le icone
                    </li>
                  </ul>
                  <p>
                    Tali tecnologie rimangono di proprietà dei rispettivi
                    proprietari e sono soggette ai loro termini di licenza.
                  </p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>7. Privacy e Protezione dei Dati</h2>
              <div className="privacy-reference">
                <p>
                  Il trattamento dei tuoi dati personali è disciplinato dalla
                  nostra{" "}
                  <Link to="/privacy-policy" className="policy-link">
                    Privacy Policy
                  </Link>
                  , che costituisce parte integrante di questi termini.
                </p>
                <div className="privacy-highlights">
                  <h3>Punti Chiave:</h3>
                  <ul>
                    <li>I tuoi dati non vengono venduti a terze parti</li>
                    <li>Utilizziamo i dati solo per fornire il servizio</li>
                    <li>
                      Puoi richiedere la cancellazione dei tuoi dati in
                      qualsiasi momento
                    </li>
                    <li>
                      I dati sono archiviati su server sicuri AWS in Europa
                    </li>
                    <li>
                      Puoi disattivare le notifiche email tramite la{" "}
                      <Link to="/unsubscribe" className="policy-link">
                        pagina di gestione email
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>8. Modifiche ai Termini</h2>
              <div className="terms-changes">
                <p>
                  Ci riserviamo il diritto di modificare questi Termini e
                  Condizioni in qualsiasi momento. Le modifiche entreranno in
                  vigore immediatamente dopo la pubblicazione sulla piattaforma.
                </p>
                <div className="notification-process">
                  <h3>Processo di Notifica:</h3>
                  <ul>
                    <li>
                      Le modifiche significative saranno comunicate via email
                    </li>
                    <li>
                      La data di "Ultimo aggiornamento" sarà sempre aggiornata
                    </li>
                    <li>
                      L'uso continuato del servizio costituisce accettazione
                      delle modifiche
                    </li>
                    <li>
                      Gli utenti che non accettano le modifiche possono cessare
                      l'utilizzo
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>9. Legge Applicabile e Foro Competente</h2>
              <div className="legal-jurisdiction">
                <div className="jurisdiction-item">
                  <h3>9.1 Legge Applicabile</h3>
                  <p>
                    Questi Termini e Condizioni sono disciplinati dalla{" "}
                    <strong>legge italiana</strong> e dal{" "}
                    <strong>
                      Regolamento Generale sulla Protezione dei Dati (GDPR)
                    </strong>{" "}
                    dell'Unione Europea.
                  </p>
                </div>

                <div className="jurisdiction-item">
                  <h3>9.2 Foro Competente</h3>
                  <p>
                    Per qualsiasi controversia derivante da o relativa a questi
                    termini o all'utilizzo di HomeCloud, sarà competente
                    esclusivamente il
                    <strong> Tribunale di Milano</strong>, Italia.
                  </p>
                </div>

                <div className="jurisdiction-item">
                  <h3>9.3 Risoluzione Alternative</h3>
                  <p>
                    Prima di ricorrere alle vie legali, le parti si impegnano a
                    tentare una risoluzione amichevole delle controversie
                    tramite negoziazione diretta o mediazione.
                  </p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>10. Disposizioni Generali</h2>
              <div className="general-provisions">
                <div className="provision-item">
                  <h3>10.1 Integrità dell'Accordo</h3>
                  <p>
                    Questi Termini e Condizioni, insieme alla Privacy Policy,
                    costituiscono l'intero accordo tra l'utente e HomeCloud.
                  </p>
                </div>

                <div className="provision-item">
                  <h3>10.2 Divisibilità</h3>
                  <p>
                    Se una qualsiasi disposizione di questi termini è ritenuta
                    non valida o inapplicabile, le restanti disposizioni
                    rimarranno in pieno vigore.
                  </p>
                </div>

                <div className="provision-item">
                  <h3>10.3 Rinuncia</h3>
                  <p>
                    Il mancato esercizio di un diritto da parte di HomeCloud non
                    costituisce rinuncia a tale diritto.
                  </p>
                </div>

                <div className="provision-item">
                  <h3>10.4 Sopravvivenza</h3>
                  <p>
                    Le disposizioni relative a limitazioni di responsabilità,
                    proprietà intellettuale e legge applicabile sopravvivranno
                    alla cessazione di questi termini.
                  </p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>11. Contatti</h2>
              <div className="contact-section">
                <p>
                  Per domande, dubbi o segnalazioni relative a questi Termini e
                  Condizioni, puoi contattarci:
                </p>
                <div className="contact-details">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:support@mail.homecloud.ninja">
                      support@mail.homecloud.ninja
                    </a>
                  </p>
                  <p>
                    <strong>Oggetto:</strong> "Termini e Condizioni - [Tua
                    richiesta]"
                  </p>
                </div>
                <p>
                  Ci impegniamo a rispondere a tutte le richieste entro 72 ore
                  lavorative.
                </p>
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

export default TermsAndConditions;
