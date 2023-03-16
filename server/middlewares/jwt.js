const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const HttpException = require("../utils/HttpException");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearer = "Bearer ";

    if (!authHeader || !authHeader.startsWith(bearer)) {
      throw new HttpException(401, "Access denied. No credentials sent!");
    }

    const token = authHeader.replace(bearer, "");
    const secretKey = process.env.JWT_SECRET || "";

    // Verify Token
    const decoded = jwt.verify(token, secretKey);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new HttpException(401, "Authentication failed!");
    }

    req.user = user;
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports.setReqUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearer = "Bearer ";

    if (!authHeader || !authHeader.startsWith(bearer)) {
      return next();
    }

    const token = authHeader.replace(bearer, "");
    const secretKey = process.env.JWT_SECRET || "";

    // Verify Token
    const decoded = jwt.verify(token, secretKey);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return next();
    }

    req.user = user;
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
