require('dotenv').config()
const express = require("express");
const router = require("./api/router");
const PORT = 3000;
const app = express();
const cors = require('cors');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
//const path = require('path');
const { JWT_SECRET } = process.env;

// Apply JSON parsing middleware
app.use(express.json());

// Logging middleware
app.use(morgan("dev"));
app.use(cors());

// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch {
    req.user = null;
  }
  next();
});

// Apply router
app.use("/", router);
app.use("/users", require("./api/users"));
app.use("/cart", require("./api/cart"));
app.use("/orders", require("./api/orders"));
//app.use("/travelers",require("./api/traveler"))

const client = require('./db/index');
client.connect();

//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .sendStatus(err.status || 500)
    .send(err.message || "Internal server error.");
});

app.use("*", (req, res) => {
  res.status(404).send("Not found.");
});

// Serving app on defined PORT
app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});