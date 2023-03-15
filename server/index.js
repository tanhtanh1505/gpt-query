const express = require("express");
const app = express();
require("dotenv/config");
require("./database/index");
const cors = require("cors");
const authRoute = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server running on port ", port));
