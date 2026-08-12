const amqp = require('amqplib');

const {
    createOrderConfirmation
} = require('../services/notificationService');

let connection;
let channel;

const connectRabbitMQ = async () => {
    try {
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

        console.log(
            'RabbitMQ connected successfully'
        );

        channel.consume(
            process.env.ORDER_COMPLETED_QUEUE,
            async (message) => {
                if (!message) {
                    return;
                }

                try {
                    const event =
                        JSON.parse(
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
    } catch (error) {
        console.error(
            'RabbitMQ connection failed:',
            error.message
        );

        process.exit(1);
    }
};

module.exports = {
    connectRabbitMQ
};