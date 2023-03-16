const app = require("express")();

const authRoutes = require("./auth");
const databaseRoutes = require("./database");
const queryRoutes = require("./query");

app.use("/auth", authRoutes);
app.use("/database", databaseRoutes);
app.use("/query", queryRoutes);

module.exports = app;
