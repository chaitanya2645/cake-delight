const orderService = require('../services/orderService');

const addItemToBasket = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { cakeId, quantity } = req.body;

        if (!cakeId) {
            return res.status(400).json({
                success: false,
                message: 'cakeId is required'
            });
        }

        const basket =
            await orderService.addItemToBasket(
                userId,
                cakeId,
                quantity
            );

        res.status(200).json({
            success: true,
            data: basket
        });
    } catch (error) {
        next(error);
    }
};

const getBasket = async (req, res, next) => {
    try {
        const basket =
            await orderService.getBasket(
                req.params.userId
            );

        res.status(200).json({
            success: true,
            data: basket
        });
    } catch (error) {
        next(error);
    }
};

const updateBasketItem = async (req, res, next) => {
    try {
        const { userId, cakeId } = req.params;
        const { quantity } = req.body;

        const basket =
            await orderService.updateBasketItem(
                userId,
                cakeId,
                quantity
            );

        res.status(200).json({
            success: true,
            data: basket
        });
    } catch (error) {
        next(error);
    }
};

const removeItemFromBasket = async (req, res, next) => {
    try {
        const { userId, cakeId } = req.params;

        const basket =
            await orderService.removeItemFromBasket(
                userId,
                cakeId
            );

        res.status(200).json({
            success: true,
            data: basket
        });
    } catch (error) {
        next(error);
    }
};

const clearBasket = async (req, res, next) => {
    try {
        const basket =
            await orderService.clearBasket(
                req.params.userId
            );

        res.status(200).json({
            success: true,
            data: basket
        });
    } catch (error) {
        next(error);
    }
};
const checkout = async (req, res, next) => {
    try {
        const order = await orderService.checkout(
            req.params.userId
        );

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addItemToBasket,
    getBasket,
    updateBasketItem,
    removeItemFromBasket,
    clearBasket,
    checkout
};