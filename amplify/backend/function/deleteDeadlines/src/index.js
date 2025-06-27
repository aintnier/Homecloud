const { createDbConnection } = require("/opt/nodejs/dbConnection");

exports.handler = async (event) => {
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
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "ID obbligatorio." }),
      };
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
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods":
          "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Scadenza eliminata con successo" }),
    };
  } catch (err) {
    console.error("❌ Errore in deleteDeadlines:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Errore del server. Impossibile eliminare la scadenza.",
        error: err.message,
      }),
    };
  } finally {
    if (connection) await connection.end();
  }
};
