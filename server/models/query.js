const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuerySchema = Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Database",
  },
});

module.exports = mongoose.model("Query", QuerySchema);
