const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, updateCart, getCartByUserId } = require('../db/db_methods');

// GET /cart/:user_id
router.get('/:user_id', async (req, res, next) => {
    try {
        const cart = await getCartByUserId(req.params.user_id);
        if (!user) {
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

//PATCH /cart/:user_id/:product_id
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