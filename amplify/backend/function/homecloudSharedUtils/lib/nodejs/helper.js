const BaseJoi = require("joi");
const JoiDate = require("@joi/date");
const Joi = BaseJoi.extend(JoiDate);

// Funzione per ottenere la configurazione dell'avatar S3
function getS3AvatarConfig(config) {
  return {
    bucketName: config.bucketName,
    folderName: config.folderName,
    region: config.region,
  };
}

// Funzione per ottenere la configurazione del logo S3
function getS3LogoConfig(config) {
  return {
    bucketName: config.bucketName,
    folderName: config.folderName,
    region: config.region,
  };
}

// Schema di validazione per deadline
const deadlineSchema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.base": "Il titolo deve essere una stringa",
    "string.min": "Il titolo deve avere almeno 3 caratteri",
    "string.max": "Il titolo può avere massimo 255 caratteri",
    "any.required": "Il titolo è obbligatorio",
  }),
  description: Joi.string().min(3).max(255).required().messages({
    "string.base": "La descrizione deve essere una stringa",
    "string.min": "La descrizione deve avere almeno 3 caratteri",
    "string.max": "La descrizione può avere massimo 255 caratteri",
    "any.required": "La descrizione è obbligatoria",
  }),
  due_date: Joi.date().format("YYYY-MM-DDTHH").required().messages({
    "date.base": "La data deve essere valida",
    "any.required": "La data di scadenza è obbligatoria",
  }),
  notifications_on: Joi.boolean().required().messages({
    "boolean.base": "Il campo notifications_on deve essere un valore booleano",
    "any.required": "Il campo notifications_on è obbligatorio",
  }),
  user_id: Joi.number().integer().required().messages({
    "number.base": "L'ID utente deve essere un numero",
    "any.required": "L'ID utente è obbligatorio",
  }),
  type: Joi.string().min(3).max(50).required().messages({
    "string.base": "Il tipo deve essere una stringa",
    "string.min": "Il tipo deve avere almeno 3 caratteri",
    "string.max": "Il tipo può avere massimo 50 caratteri",
    "any.required": "Il tipo è obbligatorio",
  }),
});

function validateDeadline(data) {
  return deadlineSchema.validate(data);
}

module.exports = {
  getS3AvatarConfig,
  getS3LogoConfig,
  validateDeadline,
};
