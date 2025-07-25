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
    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [results] = await connection.query("SELECT * FROM deadlines");

    return createCorsResponse(200, results);
  } catch (err) {
    console.error("❌ Errore in readDeadlines:", err);
    return createCorsResponse(500, {
      message: "Errore del server. Impossibile ottenere le scadenze.",
      error: err.message,
    });
  } finally {
    if (connection) await connection.end();
  }
};
