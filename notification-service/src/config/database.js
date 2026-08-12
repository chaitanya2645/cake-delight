const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log(
            'Notification database connected successfully'
        );
    } catch (error) {
        console.error(
            'Notification database connection failed:',
            error.message
        );

        process.exit(1);
    }
};

module.exports = connectDatabase;