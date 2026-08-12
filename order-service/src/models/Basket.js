const mongoose = require('mongoose');

const basketItemSchema = new mongoose.Schema(
    {
        cakeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        image: {
            type: String,
            default: ''
        }
    },
    {
        _id: false
    }
);

const basketSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        items: {
            type: [basketItemSchema],
            default: []
        },
        totalAmount: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Basket', basketSchema);