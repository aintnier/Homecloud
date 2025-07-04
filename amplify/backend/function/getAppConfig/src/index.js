const { getS3LogoConfig } = require("/opt/nodejs/helper");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  console.log("=== getAppConfig START ===");
  console.log("getAppConfig - Event:", JSON.stringify(event, null, 2));

  // Debug delle variabili d'ambiente
  console.log("Environment variables:", {
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_LOGO_FOLDER: process.env.S3_LOGO_FOLDER,
    REGION: process.env.REGION,
  });

  try {
    console.log("About to call getS3LogoConfig...");

    // Prova a chiamare getS3LogoConfig step by step
    const configParams = {
      bucketName: process.env.S3_BUCKET_NAME,
      folderName: process.env.S3_LOGO_FOLDER || "logo-imgs",
      region: process.env.REGION,
    };

    console.log("Config params:", configParams);

    // Verifica che la funzione helper esista
    console.log("getS3LogoConfig function:", typeof getS3LogoConfig);

    if (typeof getS3LogoConfig !== "function") {
      throw new Error("getS3LogoConfig is not a function");
    }

    console.log("Calling getS3LogoConfig with params:", configParams);

    // Configurazione S3 per logo
    const s3LogoConfig = getS3LogoConfig(configParams);

    console.log("S3 Logo Config received:", s3LogoConfig);

    // Verifica che la configurazione sia valida
    if (!s3LogoConfig || !s3LogoConfig.bucketName || !s3LogoConfig.region) {
      throw new Error(`Invalid S3 config: ${JSON.stringify(s3LogoConfig)}`);
    }

    console.log("Initializing S3 client...");

    // Inizializza il client S3
    const s3 = new AWS.S3({
      region: s3LogoConfig.region,
    });

    console.log("S3 client initialized successfully");

    // Lista tutti i file nella cartella dei loghi
    const listParams = {
      Bucket: s3LogoConfig.bucketName,
      Prefix: s3LogoConfig.folderName + "/",
    };

    console.log("S3 list parameters:", listParams);
    console.log("Calling S3 listObjectsV2...");

    const listResult = await s3.listObjectsV2(listParams).promise();

    console.log("S3 listObjectsV2 completed");
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

    console.log("Final app config:", appConfig);
    console.log("=== getAppConfig SUCCESS ===");

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
      body: JSON.stringify(appConfig),
    };
  } catch (err) {
    console.error("=== getAppConfig ERROR ===");
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      statusCode: err.statusCode,
    });

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
