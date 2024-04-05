const express = require('express');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const router = express.Router();
const { placeOrder, getOrderHistoryByUserId } = require('../db/db_methods');

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

// POST /orders
router.post('/', authorizeUser, async (req, res, next) => {
  try {
    const { user_id, traveler_id, quantity } = req.body;
    // Check if the user is admin or the requested user_id matches with the token user_id
    if (user_id !== req.user.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const order = await placeOrder(user_id, traveler_id, quantity);
    res.status(201).send({ order });
  } catch (error) {
    next(error);
  }
});

// GET /orders/:user_id
router.get('/:user_id', authorizeUser, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    // Check if the user is admin or the requested user_id matches with the token user_id
    if (user_id !== req.user.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const orders = await getOrderHistoryByUserId(user_id);
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
