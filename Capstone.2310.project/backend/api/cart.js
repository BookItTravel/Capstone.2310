/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const express = require('express');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  updateCart,
  getCartByUserId,
} = require('../db/db_methods');

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

// GET /cart/:user_id
router.get('/:user_id', authorizeUser, async (req, res, next) => {
  try {
    // Check if the user is admin or the requested user_id matches with the token user_id
    if (req.params.user_id !== req.user.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const cart = await getCartByUserId(req.params.user_id);
    if (!cart) {
      res.status(404).send({ message: 'Cart not found' });
    } else {
      res.send({ cart });
    }
  } catch (error) {
    next(error);
  }
});

// POST /cart
router.post('/', async (req, res, next) => {
  try {
    const { user_id, traveler_id, quantity } = req.body;
    // Check if the user is admin or the requested user_id matches with the token user_id
    if (user_id !== req.user.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const cartItem = await addToCart(user_id, traveler_id, quantity);
    res.status(201).send({ cartItem });
  } catch (error) {
    next(error);
  }
});

// DELETE /cart/:user_id/:traveler_id
router.delete('/:user_id/:traveler_id', async (req, res, next) => {
  try {
    const { user_id, traveler_id } = req.params;
    // Check if the user is admin or the requested user_id matches with the token user_id
    if (user_id !== req.user.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const cartItem = await removeFromCart(user_id, traveler_id);
    if (!cartItem) {
      res.status(404).json({ message: 'Cart item not found' });
    } else {
      res.send({ cartItem });
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /cart/:user_id/:product_id
router.patch('/:user_id/:traveler_id', async (req, res, next) => {
  try {
    const { user_id, traveler_id } = req.params;
    const { quantity } = req.body;
    // Check if the user is admin or the requested user_id matches with the token user_id
    if (user_id !== req.user.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const cartItem = await updateCart(user_id, traveler_id, quantity);
    if (!cartItem) {
      res.status(404).json({ message: 'Cart item not found' });
    } else {
      res.send({ cartItem });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
