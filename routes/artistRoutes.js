const express = require('express');

const artistController = require('../controllers/artist');

const router = express.Router();

const {add, fetchAll, findArtistByName} = artistController

/**
 * Add an Artist
 * 
 */
router.post('/register', add);

/**
 * Get all Artist.
 */
router.get('/', fetchAll);

/**
 * Search a Artist by name.
 */
router.get('/search', findArtistByName);



module.exports = router;