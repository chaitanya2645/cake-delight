const Notification =
    require('../models/Notification');

const createOrderConfirmation = async (event) => {
    const {
        orderId,
        userId,
        totalAmount
    } = event.data;

    const message =
        `Your Cake Delight order ${orderId} ` +
        `has been confirmed successfully. ` +
        `Total amount: ₹${totalAmount}.`;

    const notification =
        await Notification.create({
            userId,
            orderId,
            type: 'ORDER_CONFIRMATION',
            message,
            totalAmount,
            status: 'DELIVERED'
        });

    console.log(
        `Notification created for order ${orderId}`
    );

    console.log(`Message: ${message}`);

    return notification;
};

const getUserNotifications = async (userId) => {
    return await Notification
        .find({ userId })
        .sort({ createdAt: -1 });
};

module.exports = {
    createOrderConfirmation,
    getUserNotifications
};