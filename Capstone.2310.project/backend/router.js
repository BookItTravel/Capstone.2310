const { API_KEY, API_SECRET } = require("./config");
const Amadeus = require("amadeus");
const express = require("express");

// Create Amadeus API client
// const amadeus = new Amadeus({
//     clientId: API_KEY,
//     clientSecret: API_SECRET,
//   });

// // Create router
// const router = express.Router();
// // ...
// module.exports = router;``