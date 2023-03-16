const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { create, remove } = require("../controllers/database");
const { verifyToken } = require("../middlewares/jwt");
const { validateCreateDatabase } = require("../middlewares/validate/database");

router.post("/create", validateCreateDatabase, verifyToken, catchAsync(create));
router.delete("/remove/:id", verifyToken, catchAsync(remove));

module.exports = router;
