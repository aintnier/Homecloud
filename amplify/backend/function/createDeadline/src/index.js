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
    const body = JSON.parse(event.body);
    const { title, description, due_date, notifications_on, user_id, type } =
      body;

    // Validazione
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

    // Verifica che l'user_id esista
    const [user] = await connection.query("SELECT id FROM users WHERE id = ?", [
      user_id,
    ]);
    if (user.length === 0) {
      return createCorsResponse(400, { message: "Utente non trovato." });
    }

    // Inserisci la deadline
    const [result] = await connection.execute(
      "INSERT INTO deadlines (title, description, due_date, notifications_on, user_id, type) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, due_date, notifications_on, user_id, type]
    );

    return createCorsResponse(201, {
      message: "Scadenza creata con successo",
      id: result.insertId,
    });
  } catch (err) {
    console.error("❌ Errore in createDeadline:", err);
    return createCorsResponse(500, {
      message: "Errore durante la creazione della deadline.",
      error: err.message,
    });
  } finally {
    if (connection) await connection.end();
  }
};
