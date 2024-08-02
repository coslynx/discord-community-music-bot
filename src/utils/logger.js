const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console({
            format: format.simple(),
        }),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new transports.File({
            filename: 'logs/all.log',
        }),
    ],
});

// Middleware to log incoming requests
const requestLogger = (req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.url}`);
    next();
};

// Middleware to log errors
const errorLogger = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    next(err); // Pass the error to the next middleware
};

module.exports = {
    logger,
    requestLogger,
    errorLogger,
};