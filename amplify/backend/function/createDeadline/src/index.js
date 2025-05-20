const { createDbConnection } = require("/opt/nodejs/dbConnection");
const { validateDeadline } = require("/opt/nodejs/helper");

exports.handler = async (event) => {
  let connection;

  try {
    const body = JSON.parse(event.body);
    const { title, description, due_date, notifications_on, user_id, type } = body;

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
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.details[0].message }),
      };
    }

    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Verifica che l'user_id esista
    const [user] = await connection.query("SELECT id FROM users WHERE id = ?", [user_id]);
    if (user.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Utente non trovato." }),
      };
    }

    // Inserisci la deadline
    const [result] = await connection.execute(
      "INSERT INTO deadlines (title, description, due_date, notifications_on, user_id, type) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, due_date, notifications_on, user_id, type]
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Scadenza creata con successo",
        id: result.insertId,
      }),
    };
  } catch (err) {
    console.error("❌ Errore in createDeadline:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Errore durante la creazione della deadline.",
        error: err,
      }),
    };
  } finally {
    if (connection) await connection.end();
  }
};
