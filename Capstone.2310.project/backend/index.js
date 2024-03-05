const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require("./router");
const chalk = require('chalk');

require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;

// Logging middleware
app.use(morgan("dev"));
app.use(cors());

// Apply JSON parsing middleware
app.use(bodyParser.json());
app.use(express.json());

// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  
    try {
      req.user = verify(token, process.env.JWT);
    } catch {
      req.user = null;
    }
  
    next();
  });

// Apply router
app.use("/api", require("./api"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
      .sendStatus(err.status || 500)
      .send(err.message || "Internal server error.");
  });
  
  // Default to 404 if no other route matched
  app.use("*", (req, res) => {
    res.status(404).send("Not found.");
  });
  
  app.listen(PORT, () => {
    console.log(
      chalk.blueBright("Server is listening on Port:"),
      chalk.yellow(PORT)
    );
  });
  