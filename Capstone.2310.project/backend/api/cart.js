const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, updateCart } = require('../db/db_methods');

// POST /api/cart
router.post('/', async (req, res, next) => {
    try {
        const { user_id, traveler_id, quantity } = req.body;
        const cartItem = await addToCart(user_id, traveler_id, quantity);
        res.status(201).send({ cartItem });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/cart/:user_id/:traveler_id
router.delete('/:user_id/:traveler_id', async (req, res, next) => {
    try {
        const { user_id, traveler_id } = req.params;
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

//PATCH /api/cart/:user_id/:product_id
router.patch('/:user_id/:traveler_id', async (req, res, next) => {
    try {
        const { user_id, traveler_id } = req.params;
        const { quantity } = req.body;
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