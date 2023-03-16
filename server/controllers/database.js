const Database = require("../models/database");
const Query = require("../models/query");

module.exports.getAll = async (req, res) => {
  const databases = await Database.find({ author: req.user._id });
  res.status(200).json({ databases });
};

module.exports.getName = async (req, res) => {
  // get name and id
  const databases = await Database.find({ author: req.user._id }, { name: 1, _id: 1 });
  res.status(200).json({ databases });
};

module.exports.get = async (req, res) => {
  const { id } = req.params;
  const database = await Database.findById(id);
  res.status(200).json({ database });
};

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
