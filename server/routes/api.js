const app = require("express")();

const authRoutes = require("./auth");
const databaseRoutes = require("./database");

app.use("/auth", authRoutes);
app.use("/database", databaseRoutes);

module.exports = app;
