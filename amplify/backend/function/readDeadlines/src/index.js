const { createDbConnection } = require("/opt/nodejs/dbConnection");

exports.handler = async (event) => {
  let connection;

  try {
    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [results] = await connection.query("SELECT * FROM deadlines");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("❌ Errore in readDeadlines:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Errore del server. Impossibile ottenere le scadenze.",
        error: err.message,
      }),
    };
  } finally {
    if (connection) await connection.end();
  }
};
