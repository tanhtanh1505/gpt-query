const Database = require("../models/database");
const Query = require("../models/query");
const { formQuery } = require("../utils/formQuery");
const { getSolution } = require("../services/chatgpt");
const { getMongoDBSchema } = require("../services/detectSchema");
const { readSqlFile } = require("../services/convertSql");
const dbTypes = require("../constants/dbTypes");

module.exports.getAll = async (req, res) => {
  const databases = await Database.find({ author: req.user._id });
  const combine = [];
  for (let i = 0; i < databases.length; i++) {
    const queries = await Query.find({ author: databases[i]._id });
    combine.push({ ...databases[i]._doc, queries: queries });
  }

  res.status(200).json({ databases: combine });
};

module.exports.getName = async (req, res) => {
  // get name and id
  const databases = await Database.find({ author: req.user._id }, { name: 1, _id: 1, type: 1 });
  res.status(200).json({ databases });
};

module.exports.get = async (req, res) => {
  const { id } = req.params;
  const database = await Database.findById(id);

  const queries = await Query.find({ author: id });
  const combine = { ...database._doc, queries };

  res.status(200).json({ database: combine });
};

module.exports.create = async (req, res) => {
  const { name, type, schema } = req.body;
  const database = new Database({ name, type, schema, author: req.user._id });
  await database.save();
  res.status(201).json({ message: "Database created successfully", database: database });
};

module.exports.importDb = async (req, res) => {
  const { name, type, url } = req.body;

  if (url && url.length > 0) {
    if (type != dbTypes.MongoDB) {
      return res.status(400).json({ message: "Only MongoDB is supported for now" });
    }
    if (!url.startsWith("mongodb")) {
      return res.status(400).json({ message: "Invalid MongoDB URL" });
    }

    const schema = await getMongoDBSchema(url);
    const database = new Database({ name, type, schema, author: req.user._id });
    await database.save();
    return res.status(201).json({ message: "Database created successfully", database: database });
  } else if (req.file) {
    const schema = await readSqlFile(req.file.path);
    if (type != dbTypes.MySQL) {
      return res.status(400).json({ message: "Only MySQL is supported for now" });
    }
    const database = new Database({ name, type, schema, author: req.user._id });
    await database.save();
    return res.status(201).json({ message: "Database created successfully", database: database });
  }

  return res.status(400).json({ message: "Error exist" });
};

module.exports.remove = async (req, res) => {
  const { id } = req.params;
  await Database.findByIdAndDelete(id);
  // remove all queries of this database
  await Query.deleteMany({ author: id });

  res.status(200).json({ message: "Database deleted successfully" });
};

module.exports.getAllQuery = async (req, res) => {
  const { id } = req.params;

  const queries = await Query.find({ author: id });
  res.status(200).json({ queries });
};

module.exports.query = async (req, res) => {
  const { id } = req.params;
  const query = req.query.q;
  console.log(query);

  const database = await Database.findById(id);
  const finalQuery = formQuery(query, database.type, database.schema);
  const answer = await getSolution(finalQuery);
  // console.log(answer);

  //save to database
  await Query.create({ question: query, answer, author: id });
  return res.status(200).json({ answer });
};
