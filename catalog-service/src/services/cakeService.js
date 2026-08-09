const Cake = require('../models/Cake');

const createCake = async (cakeData) => {
    const cake = new Cake(cakeData);
    return await cake.save();
};

const getAllCakes = async (filters = {}) => {
    const query = {};

    if (filters.name) {
        query.name = {
            $regex: filters.name,
            $options: 'i'
        };
    }

    if (filters.category) {
        query.category = {
            $regex: `^${filters.category}$`,
            $options: 'i'
        };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.price = {};

        if (filters.minPrice !== undefined) {
            query.price.$gte = Number(filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
            query.price.$lte = Number(filters.maxPrice);
        }
    }

    return await Cake.find(query).sort({ createdAt: -1 });
};

const getCakeById = async (cakeId) => {
    return await Cake.findById(cakeId);
};

const updateCake = async (cakeId, cakeData) => {
    return await Cake.findByIdAndUpdate(
        cakeId,
        cakeData,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteCake = async (cakeId) => {
    return await Cake.findByIdAndDelete(cakeId);
};

module.exports = {
    createCake,
    getAllCakes,
    getCakeById,
    updateCake,
    deleteCake
};