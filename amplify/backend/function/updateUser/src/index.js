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
    const { id, full_name, email, profileImageId, default_reminder_email } =
      body;

    // Passa le env alla funzione di connessione
    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Aggiorna l'utente
    await connection.execute(
      "UPDATE users SET full_name = ?, email = ?, profileImageId = ?, default_reminder_email = ? WHERE id = ?",
      [full_name, email, profileImageId, !!default_reminder_email, id]
    );

    // Crea l'oggetto utente aggiornato con l'URL dell'immagine profilo
    const updatedUser = {
      id,
      full_name,
      email,
      profileImageId,
      default_reminder_email: !!default_reminder_email,
      profileImageUrl: `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${s3Config.folderName}/${profileImageId}.jpg`,
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    };
  } catch (err) {
    console.error("❌ Errore in updateUser:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Errore del server durante l'aggiornamento dell'utente.",
        error: err,
      }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
