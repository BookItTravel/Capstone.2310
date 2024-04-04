const express = require('express');

const router = express.Router();
const { placeOrder, getOrderHistoryByUserId } = require('../db/db_methods');

// POST /orders
router.post('/', async (req, res, next) => {
  try {
    const { user_id, traveler_id, quantity } = req.body;
    const order = await placeOrder(user_id, traveler_id, quantity);
    res.status(201).send({ order });
  } catch (error) {
    next(error);
  }
});

// GET /orders/:user_id
router.get('/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const orders = await getOrderHistoryByUserId(user_id);
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
