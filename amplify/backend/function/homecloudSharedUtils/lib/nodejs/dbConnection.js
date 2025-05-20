const mysql = require("mysql2/promise");

// Funzione per creare una connessione al database MySQL
async function createDbConnection(config) {
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });

    return connection;
  } catch (err) {
    throw new Error(`Errore durante la connessione al database: ${err}`);
  }
}

module.exports = {
  createDbConnection,
};
