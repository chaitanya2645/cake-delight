const Basket = require('../models/Basket');
const Order = require('../models/Order');
const {
    publishOrderCompleted
} = require('../messaging/rabbitmq');
const CATALOG_SERVICE_URL =
    process.env.CATALOG_SERVICE_URL || 'http://localhost:3001';

/**
 * Get cake details from Catalog Service.
 */
const getCakeFromCatalog = async (cakeId) => {
    const response = await fetch(
        `${CATALOG_SERVICE_URL}/cakes/${cakeId}`
    );

    if (!response.ok) {
        if (response.status === 404) {
            const error = new Error('Cake not found');
            error.statusCode = 404;
            throw error;
        }

        const error = new Error(
            'Catalog Service is unavailable'
        );
        error.statusCode = 503;
        throw error;
    }

    const result = await response.json();

    if (!result.success || !result.data) {
        const error = new Error('Invalid response from Catalog Service');
        error.statusCode = 502;
        throw error;
    }

    return result.data;
};

/**
 * Calculate basket total.
 */
const calculateTotal = (items) => {
    return items.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
};

/**
 * Add a cake to the user's basket.
 */
const addItemToBasket = async (
    userId,
    cakeId,
    quantity
) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
        const error = new Error(
            'Quantity must be a positive integer'
        );
        error.statusCode = 400;
        throw error;
    }

    // Get the authoritative cake information
    // from Catalog Service.
    const cake = await getCakeFromCatalog(cakeId);

    if (!cake.availability) {
        const error = new Error(
            'Cake is currently unavailable'
        );
        error.statusCode = 400;
        throw error;
    }

    let basket = await Basket.findOne({ userId });

    if (!basket) {
        basket = new Basket({
            userId,
            items: []
        });
    }

    const existingItem = basket.items.find(
        (item) =>
            item.cakeId.toString() === cakeId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        basket.items.push({
            cakeId: cake._id,
            name: cake.name,
            price: cake.price,
            quantity,
            image: cake.image
        });
    }

    basket.totalAmount = calculateTotal(
        basket.items
    );

    await basket.save();

    return basket;
};

/**
 * Get a user's basket.
 */
const getBasket = async (userId) => {
    const basket = await Basket.findOne({ userId });

    if (!basket) {
        return {
            userId,
            items: [],
            totalAmount: 0
        };
    }

    return basket;
};

/**
 * Update quantity of an item.
 */
const updateBasketItem = async (
    userId,
    cakeId,
    quantity
) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
        const error = new Error(
            'Quantity must be a positive integer'
        );
        error.statusCode = 400;
        throw error;
    }

    const basket = await Basket.findOne({ userId });

    if (!basket) {
        const error = new Error('Basket not found');
        error.statusCode = 404;
        throw error;
    }

    const item = basket.items.find(
        (basketItem) =>
            basketItem.cakeId.toString() === cakeId
    );

    if (!item) {
        const error = new Error(
            'Cake is not present in basket'
        );
        error.statusCode = 404;
        throw error;
    }

    item.quantity = quantity;

    basket.totalAmount = calculateTotal(
        basket.items
    );

    await basket.save();

    return basket;
};

/**
 * Remove an item from the basket.
 */
const removeItemFromBasket = async (
    userId,
    cakeId
) => {
    const basket = await Basket.findOne({ userId });

    if (!basket) {
        const error = new Error('Basket not found');
        error.statusCode = 404;
        throw error;
    }

    const originalCount = basket.items.length;

    basket.items = basket.items.filter(
        (item) =>
            item.cakeId.toString() !== cakeId
    );

    if (basket.items.length === originalCount) {
        const error = new Error(
            'Cake is not present in basket'
        );
        error.statusCode = 404;
        throw error;
    }

    basket.totalAmount = calculateTotal(
        basket.items
    );

    await basket.save();

    return basket;
};

/**
 * Clear the basket.
 */
const clearBasket = async (userId) => {
    const basket = await Basket.findOne({ userId });

    if (!basket) {
        return {
            userId,
            items: [],
            totalAmount: 0
        };
    }

    basket.items = [];
    basket.totalAmount = 0;

    await basket.save();

    return basket;
};
const checkout = async (userId) => {
    const basket = await Basket.findOne({ userId });

    if (!basket || basket.items.length === 0) {
        const error = new Error('Basket is empty');
        error.statusCode = 400;
        throw error;
    }

    const orderItems = basket.items.map((item) => ({
        cakeId: item.cakeId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
    }));

    const order = await Order.create({
        userId,
        items: orderItems,
        totalAmount: basket.totalAmount,
        status: 'CONFIRMED'
    });

    await publishOrderCompleted(order);

    basket.items = [];
    basket.totalAmount = 0;

    await basket.save();

    return order;
};
module.exports = {
    addItemToBasket,
    getBasket,
    updateBasketItem,
    removeItemFromBasket,
    clearBasket,
    checkout
};