require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDatabase =
    require('./config/database');

const {
    connectRabbitMQ
} = require('./messaging/rabbitmq');

const notificationRoutes =
    require('./routes/notificationRoutes');

const errorHandler =
    require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'notification-service',
        status: 'UP'
    });
});

app.use(
    '/notifications',
    notificationRoutes
);

app.use(errorHandler);

const PORT =
    process.env.PORT || 3004;

const startServer = async () => {
    try {
        await connectDatabase();
        await connectRabbitMQ();

        app.listen(PORT, () => {
            console.log(
                `Notification Service running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            'Failed to start Notification Service:',
            error.message
        );

        process.exit(1);
    }
};

startServer();