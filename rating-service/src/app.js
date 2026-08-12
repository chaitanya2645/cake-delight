require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDatabase =
    require('./config/database');

const ratingRoutes =
    require('./routes/ratingRoutes');

const errorHandler =
    require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        service: 'rating-service',
        status: 'UP'
    });
});

app.use('/ratings', ratingRoutes);

app.use(errorHandler);

const PORT =
    process.env.PORT || 3003;

const startServer = async () => {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(
            `Rating Service running on port ${PORT}`
        );
    });
};

startServer();