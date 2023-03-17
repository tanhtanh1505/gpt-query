const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  queryRemain: {
    type: Number,
    default: 5,
  },
});

module.exports = mongoose.model("Permission", PermissionSchema);
