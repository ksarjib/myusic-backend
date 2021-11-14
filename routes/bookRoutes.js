const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

const { add, fetchAll, get } = bookController;
/**
 * Add book
 * 
 */
router.post('/add', add);

/**
 * Get all book.
 */
router.get('/all', fetchAll);

/**
 * Search a book.
 */
router.get('/search', get);

module.exports = router;
