const amqp = require('amqplib');

const {
    createOrderConfirmation
} = require('../services/notificationService');

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

            await channel.prefetch(1);

            console.log('RabbitMQ connected successfully');

            channel.consume(
                process.env.ORDER_COMPLETED_QUEUE,
                async (message) => {
                    if (!message) {
                        return;
                    }

                    try {
                        const event = JSON.parse(
                            message.content.toString()
                        );

                        console.log(
                            'OrderCompleted event received:',
                            event
                        );

                        if (
                            event.eventType ===
                            'ORDER_COMPLETED'
                        ) {
                            await createOrderConfirmation(
                                event
                            );
                        }

                        channel.ack(message);

                        console.log(
                            'RabbitMQ message acknowledged'
                        );
                    } catch (error) {
                        console.error(
                            'Failed to process RabbitMQ message:',
                            error.message
                        );

                        channel.nack(
                            message,
                            false,
                            false
                        );
                    }
                }
            );

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

module.exports = {
    connectRabbitMQ
};
