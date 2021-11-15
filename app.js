const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const artistRoutes = require('./routes/artistRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

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
// app.use('/music',musicRoutes );
app.use('/artist', artistRoutes);
app.use('/rating', ratingRoutes);


app.use(
    (err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }

        return res.status(err.status || 500).json({
            error: process.env.JWT_SECRET === 'development' ? err : undefined,
            message: err.message
        });
    }
);

module.exports = app;
