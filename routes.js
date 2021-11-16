
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const artistRoutes = require('./routes/artistRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

// Book routes
router.use('/book', bookRoutes);

// User routes
router.use('/auth', authRoutes);

// Music routes
router.use('/music', musicRoutes);

// Artise routes
// router.use('/artist', artistRoutes);

// Rating routes
router.use('/rating', ratingRoutes);

module.exports = router;
