const notificationService =
    require('../services/notificationService');

const getUserNotifications = async (
    req,
    res,
    next
) => {
    try {
        const notifications =
            await notificationService
                .getUserNotifications(
                    req.params.userId
                );

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserNotifications
};