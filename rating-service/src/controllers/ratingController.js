const ratingService = require('../services/ratingService');

const createRating = async (req, res, next) => {
    try {
        const rating =
    await ratingService.createRating({
        ...req.body,
        userId: req.params.userId,
        cakeId: req.params.cakeId
    });

        res.status(201).json({
            success: true,
            data: rating
        });
    } catch (error) {
        next(error);
    }
};

const getRatingsByCake = async (req, res, next) => {
    try {
        const ratings =
            await ratingService.getRatingsByCake(
                req.params.cakeId
            );

        res.json({
            success: true,
            count: ratings.length,
            data: ratings
        });
    } catch (error) {
        next(error);
    }
};

const getAverageRating = async (req, res, next) => {
    try {
        const result =
            await ratingService.getAverageRating(
                req.params.cakeId
            );

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getRatingsByUser = async (req, res, next) => {
    try {
        const ratings =
            await ratingService.getRatingsByUser(
                req.params.userId
            );

        res.json({
            success: true,
            count: ratings.length,
            data: ratings
        });
    } catch (error) {
        next(error);
    }
};

const deleteRating = async (req, res, next) => {
    try {
        await ratingService.deleteRating(
            req.params.ratingId,
            req.params.userId
        );

        res.json({
            success: true,
            message: 'Rating deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRating,
    getRatingsByCake,
    getAverageRating,
    getRatingsByUser,
    deleteRating
};