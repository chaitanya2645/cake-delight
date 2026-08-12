const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true
        },

        cakeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            trim: true,
            maxlength: 500
        }
    },
    {
        timestamps: true
    }
);

ratingSchema.index(
    { userId: 1, cakeId: 1 },
    { unique: true }
);

module.exports =
    mongoose.model('Rating', ratingSchema);