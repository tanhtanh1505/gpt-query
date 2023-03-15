const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

router.get("/log", ensureAuth, async (req, res) => {
  res.render("index", { userinfo: req.user });
});

router.get("/info", (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
