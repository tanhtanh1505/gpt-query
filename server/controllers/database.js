const User = require("../models/user");
const Database = require("../models/database");

module.exports.create = async (req, res) => {
  const { name, type, schema } = req.body;
  const database = new Database({ name, type, schema, author: req.user._id });
  await database.save();
  res.status(201).json({ message: "Database created successfully", database: database });
};

module.exports.remove = async (req, res) => {
  const { id } = req.params;
  await Database.findByIdAndDelete(id);
  // remove all queries of this database
  await Query.deleteMany({ author: id });

  res.status(200).json({ message: "Database deleted successfully" });
};
