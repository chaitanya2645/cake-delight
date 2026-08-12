const amqp = require('amqplib');

let connection;
let channel;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);

        channel = await connection.createChannel();

        await channel.assertQueue(
            process.env.ORDER_COMPLETED_QUEUE,
            {
                durable: true
            }
        );

        console.log('RabbitMQ connected successfully');
    } catch (error) {
        console.error(
            'RabbitMQ connection failed:',
            error.message
        );

        process.exit(1);
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