const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true
        },

        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        type: {
            type: String,
            enum: ['ORDER_CONFIRMATION'],
            required: true
        },

        message: {
            type: String,
            required: true
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ['PENDING', 'DELIVERED', 'FAILED'],
            default: 'DELIVERED'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    'Notification',
    notificationSchema
);