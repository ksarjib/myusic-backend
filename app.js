const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const subscription = require('./routes/subscriptionRoutes')
const fileUpload = require('express-fileupload');

const app = express();

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable files upload 
app.use(express.static(__dirname + '/public'));
app.use(fileUpload({ createParentPath: true }));

app.set('port', process.env.PORT || 3000);

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);
// routes
app.use('/book', bookRoutes);
app.use('/auth', authRoutes);
app.use('/music',musicRoutes );
app.use('/rating', ratingRoutes);
app.use('/subscribe', subscription);



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
