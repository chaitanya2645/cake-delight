require('dotenv').config();

const express = require('express');
const cors = require('cors');

const proxyRoutes = require('./routes/proxyRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());

app.get('/health', (req, res) => {
    res.json({
        service: 'api-gateway',
        status: 'UP'
    });
});

app.use('/', proxyRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
