const { createDbConnection } = require("/opt/nodejs/dbConnection");
const {
  getS3AvatarConfig,
  createCorsResponse,
  handleOptionsRequest,
} = require("/opt/nodejs/helper");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return handleOptionsRequest();
  }

  let connection;

  try {
    // Passa le env alla funzione helper
    const s3Config = getS3AvatarConfig({
      bucketName: process.env.S3_BUCKET_NAME,
      folderName: process.env.S3_BUCKET_FOLDER,
      region: process.env.REGION,
    });

    // Passa le env alla funzione di connessione
    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [results] = await connection.query("SELECT * FROM users");

    // Aggiungi URL immagine profilo
    const usersWithProfileImage = results.map((user) => ({
      ...user,
      profileImageUrl: `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${s3Config.folderName}/${user.profileImageId}.jpg`,
    }));

    return createCorsResponse(200, usersWithProfileImage);
  } catch (err) {
    console.error("❌ Errore in readUsers:", err);
    return createCorsResponse(500, {
      message: "Errore del server durante la lettura degli utenti.",
      error: err.message,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
