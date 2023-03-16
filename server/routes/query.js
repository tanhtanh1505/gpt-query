const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { get } = require("../controllers/query");
const { verifyToken } = require("../middlewares/jwt");

router.use(verifyToken);

router.get("/:id", catchAsync(get));

module.exports = router;
