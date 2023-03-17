const express = require("express");
const app = express();
require("dotenv/config");
require("./database/index");
const cors = require("cors");
const apiRoute = require("./routes/api");
const path = require("path");
const AppError = require("./utils/ExpressError");

app.use(cors());
app.use(express.json());

app.use("/api", apiRoute);

app.use(express.static(path.join(__dirname, "build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Loi rui" } = err;
  res.status(status).end(message);
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server running on port ", port));
