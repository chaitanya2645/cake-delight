const express = require('express');

const {
    addItemToBasket,
    getBasket,
    updateBasketItem,
    removeItemFromBasket,
    clearBasket,
    checkout
} = require('../controllers/orderController');

const router = express.Router();

// Temporary route test
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        service: 'order-service',
        message: 'Order routes are working'
    });
});

// Add cake to basket
router.post(
    '/basket/:userId/items',
    addItemToBasket
);

// View basket
router.get(
    '/basket/:userId',
    getBasket
);

// Update quantity
router.put(
    '/basket/:userId/items/:cakeId',
    updateBasketItem
);

// Remove item
router.delete(
    '/basket/:userId/items/:cakeId',
    removeItemFromBasket
);

// Clear basket
router.delete(
    '/basket/:userId',
    clearBasket
);

router.post(
    '/checkout/:userId',
    checkout
);
module.exports = router;