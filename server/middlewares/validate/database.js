const { createDatabaseSchema, importDatabaseSchema } = require("../../schemas/database");
const HttpException = require("../../utils/HttpException");

module.exports.validateCreateDatabase = (req, res, next) => {
  const { error } = createDatabaseSchema.validate(req.body);
  if (error) {
    throw new HttpException(500, error.message);
  }
  next();
};

module.exports.validateImportDatabase = (req, res, next) => {
  const { error } = importDatabaseSchema.validate(req.body);
  if (error) {
    throw new HttpException(500, error.message);
  }
  next();
};
