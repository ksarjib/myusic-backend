
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

// Book routes
router.use('/book', bookRoutes);

// User routes
router.use('/auth', authRoutes);

module.exports = router;
