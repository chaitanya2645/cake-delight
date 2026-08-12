const mongoose = require('mongoose');

const Rating = require('../models/Rating');

const createRating = async (ratingData) => {
    const {
        userId,
        cakeId,
        rating,
        comment
    } = ratingData;

    if (!userId) {
        throw new Error(
            'userId is required'
        );
    }

    if (
        !cakeId ||
        !mongoose.Types.ObjectId.isValid(cakeId)
    ) {
        throw new Error(
            'Valid cakeId is required'
        );
    }

    if (
        rating === undefined ||
        rating < 1 ||
        rating > 5
    ) {
        throw new Error(
            'Rating must be between 1 and 5'
        );
    }

    const existingRating =
        await Rating.findOne({
            userId,
            cakeId
        });

    if (existingRating) {
        throw new Error(
            'User has already rated this cake'
        );
    }

    return await Rating.create({
        userId,
        cakeId,
        rating,
        comment
    });
};

const getRatingsByCake = async (cakeId) => {
    if (
        !mongoose.Types.ObjectId.isValid(cakeId)
    ) {
        throw new Error(
            'Invalid cake ID'
        );
    }

    return await Rating
        .find({ cakeId })
        .sort({ createdAt: -1 });
};

const getAverageRating = async (cakeId) => {
    if (
        !mongoose.Types.ObjectId.isValid(cakeId)
    ) {
        throw new Error(
            'Invalid cake ID'
        );
    }

    const result = await Rating.aggregate([
        {
            $match: {
                cakeId:
                    new mongoose.Types.ObjectId(
                        cakeId
                    )
            }
        },
        {
            $group: {
                _id: '$cakeId',
                averageRating: {
                    $avg: '$rating'
                },
                totalRatings: {
                    $sum: 1
                }
            }
        }
    ]);

    if (result.length === 0) {
        return {
            averageRating: 0,
            totalRatings: 0
        };
    }

    return {
        averageRating:
            Math.round(
                result[0].averageRating * 10
            ) / 10,
        totalRatings:
            result[0].totalRatings
    };
};

const getRatingsByUser = async (userId) => {
    return await Rating
        .find({ userId })
        .sort({ createdAt: -1 });
};

const deleteRating = async (
    ratingId,
    userId
) => {
    if (
        !mongoose.Types.ObjectId.isValid(
            ratingId
        )
    ) {
        throw new Error(
            'Invalid rating ID'
        );
    }

    const rating =
        await Rating.findOneAndDelete({
            _id: ratingId,
            userId
        });

    if (!rating) {
        throw new Error(
            'Rating not found'
        );
    }

    return rating;
};

module.exports = {
    createRating,
    getRatingsByCake,
    getAverageRating,
    getRatingsByUser,
    deleteRating
};