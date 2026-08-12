const express = require('express');

const {
    createRating,
    getRatingsByCake,
    getAverageRating,
    getRatingsByUser,
    deleteRating
} = require('../controllers/ratingController');

const router = express.Router();

// Create a rating
router.post(
    '/users/:userId/cakes/:cakeId',
    createRating
);

// Get all ratings for a cake
router.get(
    '/cakes/:cakeId',
    getRatingsByCake
);

// Get average rating for a cake
router.get(
    '/cakes/:cakeId/average',
    getAverageRating
);

// Get ratings by user
router.get(
    '/users/:userId',
    getRatingsByUser
);

// Delete user's rating
router.delete(
    '/users/:userId/:ratingId',
    deleteRating
);

module.exports = router;