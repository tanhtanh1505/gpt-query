const express = require("express");
const app = express();
require("dotenv/config");
require("./database/index");
const cors = require("cors");
const apiRoute = require("./routes/api");

app.use(cors());
app.use(express.json());

app.use("/api", apiRoute);

app.use((err, req, res, next) => {
  const { status = 500, message = "Loi rui" } = err;
  res.status(status).end(message);
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server running on port ", port));
