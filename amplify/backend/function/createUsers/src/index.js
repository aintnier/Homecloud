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
    const s3Config = getS3AvatarConfig({
      bucketName: process.env.S3_BUCKET_NAME,
      folderName: process.env.S3_BUCKET_FOLDER,
      region: process.env.REGION,
    });

    const body = JSON.parse(event.body);
    const { full_name, email, profileImageId } = body;

    connection = await createDbConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Controlla se l'utente esiste già
    const [existingUsers] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return createCorsResponse(409, {
        message: "Un utente con questa email esiste già.",
        code: "USER_ALREADY_EXISTS",
      });
    }

    // Inserisci il nuovo utente
    const [result] = await connection.execute(
      "INSERT INTO users (full_name, email, profileImageId) VALUES (?, ?, ?)",
      [full_name, email, profileImageId]
    );

    const newUser = {
      id: result.insertId,
      full_name,
      email,
      profileImageId,
      profileImageUrl: `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${s3Config.folderName}/${profileImageId}.jpg`,
    };

    return createCorsResponse(201, newUser);
  } catch (err) {
    console.error("❌ Errore in createUsers:", err);

    // Gestisci errori specifici del database
    if (err.code === "ER_DUP_ENTRY") {
      return createCorsResponse(409, {
        message: "Un utente con questa email esiste già.",
        code: "USER_ALREADY_EXISTS",
      });
    }

    return createCorsResponse(500, {
      message: "Errore del server durante la creazione dell'utente.",
      error: err.message,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
