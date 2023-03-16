const Query = require("../models/query");

module.exports.get = async (req, res) => {
  const { id } = req.params;
  const query = await Query.findById(id);
  res.status(200).json({ query });
};
