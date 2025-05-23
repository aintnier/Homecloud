const { createDbConnection } = require("/opt/nodejs/dbConnection");
const { getS3AvatarConfig } = require("/opt/nodejs/helper");

exports.handler = async (event) => {
  let connection;

  try {
    // Passa le env alla funzione helper
    const s3Config = getS3AvatarConfig({
      bucketName: process.env.S3_BUCKET_NAME,
      folderName: process.env.S3_BUCKET_FOLDER,
      region: process.env.REGION,
    });

    // Parsing del body della richiesta
    const body = JSON.parse(event.body);
    const { full_name, email, profileImageId } = body;

    // Passa le env alla funzione di connessione
    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Inserisci il nuovo utente
    const [result] = await connection.execute(
      "INSERT INTO users (full_name, email, profileImageId) VALUES (?, ?, ?)",
      [full_name, email, profileImageId]
    );

    // Crea l'oggetto utente con l'URL dell'immagine profilo
    const newUser = {
      id: result.insertId,
      full_name,
      email,
      profileImageId,
      profileImageUrl: `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${s3Config.folderName}/${profileImageId}.jpg`,
    };

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
  } catch (err) {
    console.error("❌ Errore in createUsers:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Errore del server durante la creazione dell'utente.",
        error: err,
      }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
