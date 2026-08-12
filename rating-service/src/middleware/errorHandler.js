const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message:
                'User has already rated this cake'
        });
    }

    if (
        err.name === 'ValidationError'
    ) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: Object.values(
                err.errors
            ).map(error => error.message)
        });
    }

    if (
        err.message === 'Invalid cake ID' ||
        err.message === 'Valid cakeId is required'
    ) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (
        err.message === 'Rating must be between 1 and 5'
    ) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (
        err.message === 'userId is required'
    ) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (
        err.message === 'Rating not found'
    ) {
        return res.status(404).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message ||
            'Internal server error'
    });
};

module.exports = errorHandler;