const app = require('./app');
const logger = require('./config/logger');
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;
const port = process.env.PORT;
if (url == null) {
    logger.log({
        level: 'error',
        message: 'MONGO_URL not specified in environment'
    });
    process.exit(1);
} else {
    console.log(url);
    mongoose.connect(url, {
        useNewUrlParser: "true",
    }).then(() => {
        app.listen(app.get('port'), () => {
            logger.info(
                `🌏 Express server started at http://localhost:${port}`
            );
        });
    })

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
    logger.info('Gracefully shutting down');
    logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: 'SIGINT'
    });
    process.exit(0);
});
