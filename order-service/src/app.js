require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDatabase = require('./config/database');
const { connectRabbitMQ } = require('./messaging/rabbitmq');

const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'order-service',
        status: 'UP'
    });
});

app.use('/orders', orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3002;

const startServer = async () => {
    try {
        await connectDatabase();
        await connectRabbitMQ();

        app.listen(PORT, () => {
            console.log(
                `Order Service running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            'Failed to start Order Service:',
            error.message
        );

        process.exit(1);
    }
};

startServer();