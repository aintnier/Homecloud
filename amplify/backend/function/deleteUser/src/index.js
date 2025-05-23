const { createDbConnection } = require("/opt/nodejs/dbConnection");

exports.handler = async (event) => {
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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Utente con id ${id} eliminato con successo.`,
      }),
    };
  } catch (err) {
    console.error("❌ Errore in deleteUser:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Errore del server durante l'eliminazione dell'utente.",
        error: err,
      }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
