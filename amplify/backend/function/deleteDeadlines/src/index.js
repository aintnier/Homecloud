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
    let body = {};
    if (event.body) {
      body = JSON.parse(event.body);
    }
    const id =
      event.pathParameters && event.pathParameters.id
        ? parseInt(event.pathParameters.id, 10)
        : body.id;

    console.log("ID ricevuto per delete:", id, "Body:", body);

    if (!id) {
      return createCorsResponse(400, { message: "ID obbligatorio." });
    }

    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await connection.execute(
      "DELETE FROM deadlines WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return createCorsResponse(404, { message: "Scadenza non trovata" });
    }

    return createCorsResponse(200, {
      message: "Scadenza eliminata con successo",
    });
  } catch (err) {
    console.error("❌ Errore in deleteDeadlines:", err);
    return createCorsResponse(500, {
      message: "Errore del server. Impossibile eliminare la scadenza.",
      error: err.message,
    });
  } finally {
    if (connection) await connection.end();
  }
};
