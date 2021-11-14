const { createLogger, format, transports } = require('winston');

const logTransports = [
    new transports.File({
        level: 'error',
        filename: './logs/error.log',
        format: format.json({
            replacer: (key, value) => {
                if (key === 'error') {
                    return {
                        message: (value).message,
                        stack: (value).stack
                    };
                }
                return value;
            }
        })
    }),
    new transports.Console({
        level: 'debug',
        format: format.prettyPrint()
    })
];

const logger = createLogger({
    format: format.combine(format.timestamp()),
    transports: logTransports,
    defaultMeta: { service: 'api' }
});

module.exports = logger;
