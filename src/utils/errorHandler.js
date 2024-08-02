const logger = require('./logger');

function errorHandler(err, req, res, next) {
    logger.error(err.message || 'An unknown error occurred.');

    if (!res.headersSent) {
        res.status(err.statusCode || 500);

        // Respond with a user-friendly message
        const responseMessage = {
            success: false,
            message: err.message || 'Internal Server Error.',
        };

        // For development, include the stack trace to identify the issue
        if (process.env.NODE_ENV === 'development') {
            responseMessage.stack = err.stack;
        }

        res.json(responseMessage);
    }
}

module.exports = errorHandler;