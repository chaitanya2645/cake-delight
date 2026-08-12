const amqp = require('amqplib');

let connection;
let channel;

const connectRabbitMQ = async () => {
    const maxRetries = 12;
    const retryDelay = 5000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(
                `Connecting to RabbitMQ (attempt ${attempt}/${maxRetries})...`
            );

            connection = await amqp.connect(
                process.env.RABBITMQ_URL
            );

            channel = await connection.createChannel();

            await channel.assertQueue(
                process.env.ORDER_COMPLETED_QUEUE,
                {
                    durable: true
                }
            );

            console.log('RabbitMQ connected successfully');

            return;
        } catch (error) {
            console.error(
                `RabbitMQ connection failed: ${error.message}`
            );

            if (attempt === maxRetries) {
                throw new Error(
                    'Unable to connect to RabbitMQ after multiple attempts'
                );
            }

            console.log(
                `Retrying RabbitMQ connection in ${retryDelay / 1000} seconds...`
            );

            await new Promise(resolve =>
                setTimeout(resolve, retryDelay)
            );
        }
    }
};

const publishOrderCompleted = async (order) => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not available');
    }

    const message = {
        eventType: 'ORDER_COMPLETED',
        timestamp: new Date().toISOString(),
        data: {
            orderId: order._id,
            userId: order.userId,
            totalAmount: order.totalAmount,
            items: order.items
        }
    };

    channel.sendToQueue(
        process.env.ORDER_COMPLETED_QUEUE,
        Buffer.from(JSON.stringify(message)),
        {
            persistent: true,
            contentType: 'application/json'
        }
    );

    console.log(
        `Order completed event published: ${order._id}`
    );
};

module.exports = {
    connectRabbitMQ,
    publishOrderCompleted
};
