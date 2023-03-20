const Joi = require("joi");
const dbTypes = require("../constants/dbTypes");

module.exports.createDatabaseSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(dbTypes)),
  schema: Joi.array().required(),
});

module.exports.importDatabaseSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(dbTypes)),
  url: Joi.string(),
  file: Joi.string(),
});
