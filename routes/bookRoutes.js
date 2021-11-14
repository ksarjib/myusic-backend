const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

const { add, fetchAll } = bookController;
/**
 * Add book
 * 
 */
router.post('/', add);

/**
 * Get all book.
 */
router.get('/', fetchAll);

module.exports = router;
