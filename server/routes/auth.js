const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/auth");
const catchAsync = require("../utils/catchAsync");

router.post("/login", catchAsync(login));

module.exports = router;
