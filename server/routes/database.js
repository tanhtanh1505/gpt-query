const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { getAll, getName, get, create, importDb, remove, getAllQuery, query, downloadExportTool } = require("../controllers/database");
const { verifyToken } = require("../middlewares/jwt");
const { hasPermission } = require("../middlewares/permisson");
const { validateCreateDatabase } = require("../middlewares/validate/database");
const multer = require("multer");

let upload = multer({ dest: "uploads/" });

router.use(verifyToken);

router.get("/", catchAsync(getAll));
router.get("/name", catchAsync(getName));

router.post("/create", validateCreateDatabase, catchAsync(create));
router.post("/import", upload.single("file"), catchAsync(importDb));
router.get("/download-export-tool", catchAsync(downloadExportTool));

router.delete("/remove/:id", catchAsync(remove));
router.get("/:id", catchAsync(get));
router.get("/:id/all-query", catchAsync(getAllQuery));
router.get("/:id/query", hasPermission, catchAsync(query));

module.exports = router;
