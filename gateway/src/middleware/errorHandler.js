const errorHandler = (err, req, res, next) => {
    console.error('Gateway error:', err.message);

    res.status(500).json({
        success: false,
        message: 'Gateway internal server error'
    });
};

module.exports = errorHandler;
