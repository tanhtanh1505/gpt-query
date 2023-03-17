const Permission = require("../models/permission");

module.exports.hasPermission = async (req, res, next) => {
  // check if query remain > 0, else reduce query remain
  const user = await Permission.findOne({ user: req.user._id });
  if (user.queryRemain <= 0) {
    return res.status(403).json({ message: "You have reached your query limit" });
  }

  user.queryRemain -= 1;
  await user.save();

  next();
};
