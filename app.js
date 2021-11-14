const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);
// Book routes
app.use('/book', bookRoutes);
app.use('/auth', authRoutes);


app.use(
    (err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }

        return res.status(err.status || 500).json({
            error: config.app.env === 'development' ? err : undefined,
            message: err.message
        });
    }
);

module.exports = app;
