const { createDbConnection } = require("/opt/nodejs/dbConnection");
const {
  createCorsResponse,
  handleOptionsRequest,
} = require("/opt/nodejs/helper");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return handleOptionsRequest();
  }

  let connection;

  try {
    // Parsing del body della richiesta
    const body = JSON.parse(event.body);
    const { id } = body;

    // Passa le env alla funzione di connessione
    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Elimina l'utente
    await connection.execute("DELETE FROM users WHERE id = ?", [id]);

    return createCorsResponse(200, {
      message: `Utente con id ${id} eliminato con successo.`,
    });
  } catch (err) {
    console.error("❌ Errore in deleteUser:", err);
    return createCorsResponse(500, {
      message: "Errore del server durante l'eliminazione dell'utente.",
      error: err.message,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
