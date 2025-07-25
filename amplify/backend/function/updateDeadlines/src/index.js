const { createDbConnection } = require("/opt/nodejs/dbConnection");
const {
  validateDeadline,
  createCorsResponse,
  handleOptionsRequest,
} = require("/opt/nodejs/helper");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return handleOptionsRequest();
  }

  let connection;

  try {
    if (!event.body) {
      return createCorsResponse(400, { message: "Richiesta senza body." });
    }

    const body = JSON.parse(event.body);
    const id =
      event.pathParameters && event.pathParameters.id
        ? parseInt(event.pathParameters.id, 10)
        : body.id;

    console.log("ID ricevuto per update:", id, "Body:", body);

    const { title, description, due_date, notifications_on, user_id, type } =
      body;

    // Validazione
    if (
      !id ||
      !title ||
      !description ||
      !due_date ||
      notifications_on === undefined ||
      !user_id ||
      !type
    ) {
      return createCorsResponse(400, {
        message: "Tutti i campi sono obbligatori.",
      });
    }

    const { error } = validateDeadline({
      title,
      description,
      due_date,
      notifications_on,
      user_id,
      type,
    });
    if (error) {
      return createCorsResponse(400, { message: error.details[0].message });
    }

    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Aggiorna la deadline
    const [result] = await connection.execute(
      "UPDATE deadlines SET title = ?, description = ?, due_date = ?, notifications_on = ?, user_id = ?, type = ? WHERE id = ?",
      [title, description, due_date, notifications_on, user_id, type, id]
    );

    if (result.affectedRows === 0) {
      return createCorsResponse(404, { message: "Scadenza non trovata" });
    }

    return createCorsResponse(200, {
      message: "Scadenza aggiornata con successo",
    });
  } catch (err) {
    console.error("❌ Errore in updateDeadlines:", err);
    return createCorsResponse(500, {
      message: "Errore del server. Impossibile aggiornare la scadenza.",
      error: err.message,
    });
  } finally {
    if (connection) await connection.end();
  }
};
