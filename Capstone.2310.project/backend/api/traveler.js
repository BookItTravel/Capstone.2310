const express = require('express');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const router = express.Router();
const { addTraveler } = require('../db/db_methods');

// Middleware function to check authorization
const authorizeUser = (req, res, next) => {
  // check if the request contains a valid JWT token
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/', authorizeUser, async (req, res, next) => {
  try {
    // Check if the user is admin or not
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const {
      firstname, lastname, date_of_birth, passportNumber,
    } = req.body;
    const traveler = await addTraveler({
      firstname, lastname, date_of_birth, email, passportNumber, user_id,
    });
    if (traveler) {
      res.send(traveler);
    } else {
      next({
        name: 'Your traveler was not added successfully',
      });
    }
  } catch (error) {
    next(error);
  }
});
