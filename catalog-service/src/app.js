const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDatabase = require('./config/database');
const cakeRoutes = require('./routes/cakeRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'catalog-service',
        status: 'UP'
    });
});

app.use('/cakes', cakeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`Catalog Service running on port ${PORT}`);
    });
};

startServer();