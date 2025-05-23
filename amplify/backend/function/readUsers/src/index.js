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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(usersWithProfileImage),
    };
  } catch (err) {
    console.error("❌ Errore in readUsers:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "Errore del server durante la lettura degli utenti.",
        error: err,
      }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
