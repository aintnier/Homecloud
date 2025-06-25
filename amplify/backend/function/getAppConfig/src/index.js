const { getS3LogoConfig } = require("/opt/nodejs/helper");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  console.log("getAppConfig - Event:", JSON.stringify(event, null, 2));

  try {
    // Configurazione S3 per logo
    const s3LogoConfig = getS3LogoConfig({
      bucketName: process.env.S3_BUCKET_NAME,
      folderName: process.env.S3_LOGO_FOLDER || "logo-imgs",
      region: process.env.REGION,
    });

    console.log("S3 Logo Config:", s3LogoConfig);

    // Inizializza il client S3
    const s3 = new AWS.S3({
      region: s3LogoConfig.region,
    });

    // Lista tutti i file nella cartella dei loghi
    const listParams = {
      Bucket: s3LogoConfig.bucketName,
      Prefix: s3LogoConfig.folderName + "/",
    };

    const listResult = await s3.listObjectsV2(listParams).promise();

    console.log("Files found in logo folder:", listResult.Contents);

    // Costruisci gli URL per tutti i loghi
    const logos = {};

    if (listResult.Contents) {
      listResult.Contents.forEach((file) => {
        // Rimuovi il prefixo della cartella per ottenere solo il nome del file
        const fileName = file.Key.replace(s3LogoConfig.folderName + "/", "");

        // Salta le cartelle (file senza nome)
        if (fileName && !fileName.endsWith("/")) {
          // Rimuovi l'estensione per usare come chiave
          const logoKey = fileName.replace(/\.[^/.]+$/, "");
          // Costruisci l'URL completo
          const logoUrl = `https://${s3LogoConfig.bucketName}.s3.${s3LogoConfig.region}.amazonaws.com/${s3LogoConfig.folderName}/${fileName}`;
          logos[logoKey] = logoUrl;
        }
      });
    }

    console.log("Generated Logo URLs:", logos);

    // Configurazione dell'app (espandibile in futuro)
    const appConfig = {
      logos: logos,
      // Mantieni retrocompatibilità
      logoUrl:
        logos["Logo"] || logos["logo"] || Object.values(logos)[0] || null,
      version: "1.0.0",
      // Aggiungi altre configurazioni future qui
      // theme: {},
      // features: {},
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appConfig),
    };
  } catch (err) {
    console.error("Error in getAppConfig:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Errore del server durante il recupero della configurazione.",
        error: err.message,
        logos: {},
        logoUrl: null,
      }),
    };
  }
};
