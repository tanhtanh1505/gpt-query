const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { getAll, getName, get, create, remove, getAllQuery, query } = require("../controllers/database");
const { verifyToken } = require("../middlewares/jwt");
const { validateCreateDatabase } = require("../middlewares/validate/database");

router.use(verifyToken);

router.get("/", catchAsync(getAll));
router.get("/name", catchAsync(getName));

router.post("/create", validateCreateDatabase, catchAsync(create));
router.delete("/remove/:id", catchAsync(remove));
router.get("/:id", catchAsync(get));
router.get("/:id/all-query", catchAsync(getAllQuery));
router.get("/:id/query", catchAsync(query));

module.exports = router;
