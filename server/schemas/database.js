const Joi = require("joi");

module.exports.createDatabaseSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  schema: Joi.array().required(),
});
