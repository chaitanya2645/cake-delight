const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use(
    '/cakes',
    createProxyMiddleware({
        target: process.env.CATALOG_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/cakes${path}`
    })
);

router.use(
    '/orders',
    createProxyMiddleware({
        target: process.env.ORDER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/orders${path}`
    })
);

router.use(
    '/ratings',
    createProxyMiddleware({
        target: process.env.RATING_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/ratings${path}`
    })
);

router.use(
    '/notifications',
    createProxyMiddleware({
        target: process.env.NOTIFICATION_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/notifications${path}`
    })
);

module.exports = router;
