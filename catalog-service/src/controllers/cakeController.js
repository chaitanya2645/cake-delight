const cakeService = require('../services/cakeService');

const createCake = async (req, res, next) => {
    try {
        const cake = await cakeService.createCake(req.body);

        res.status(201).json({
            success: true,
            data: cake
        });
    } catch (error) {
        next(error);
    }
};

const getAllCakes = async (req, res, next) => {
    try {
        const cakes = await cakeService.getAllCakes(req.query);

        res.status(200).json({
            success: true,
            count: cakes.length,
            data: cakes
        });
    } catch (error) {
        next(error);
    }
};

const getCakeById = async (req, res, next) => {
    try {
        const cake = await cakeService.getCakeById(req.params.id);

        if (!cake) {
            return res.status(404).json({
                success: false,
                message: 'Cake not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cake
        });
    } catch (error) {
        next(error);
    }
};

const updateCake = async (req, res, next) => {
    try {
        const cake = await cakeService.updateCake(
            req.params.id,
            req.body
        );

        if (!cake) {
            return res.status(404).json({
                success: false,
                message: 'Cake not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cake
        });
    } catch (error) {
        next(error);
    }
};

const deleteCake = async (req, res, next) => {
    try {
        const cake = await cakeService.deleteCake(req.params.id);

        if (!cake) {
            return res.status(404).json({
                success: false,
                message: 'Cake not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cake deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCake,
    getAllCakes,
    getCakeById,
    updateCake,
    deleteCake
};