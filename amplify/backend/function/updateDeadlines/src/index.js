const { createDbConnection } = require("/opt/nodejs/dbConnection");
const { validateDeadline } = require("/opt/nodejs/helper");

exports.handler = async (event) => {
  let connection;

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Richiesta senza body." }),
      };
    }

    const body = JSON.parse(event.body);
    const {
      id,
      title,
      description,
      due_date,
      notifications_on,
      user_id,
      type,
    } = body;

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
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Tutti i campi sono obbligatori." }),
      };
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
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: error.details[0].message }),
      };
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
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Scadenza non trovata" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Scadenza aggiornata con successo" }),
    };
  } catch (err) {
    console.error("❌ Errore in updateDeadlines:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Errore del server. Impossibile aggiornare la scadenza.",
        error: err.message,
      }),
    };
  } finally {
    if (connection) await connection.end();
  }
};
