const express = require('express');
const musicController = require('../controllers/music');
const router = express.Router();
const uploadFile = require('../middlewares/imageUpload');
const minioService = require('../service/minioService');
const validateJWT = require('../utils/jwtUtils')

const { add, fetchAll, findById, fetchAllForArtist } = musicController;
/**
 * Add a music
 * 
 */

router.post('/', validateJWT.authenticateToken, uploadFile, add);

/**
 * Get all musics.
 */
router.get('/', validateJWT.authenticateToken, fetchAll);


/**
 * Get all musics of an artist.
 */
router.get('/artist/:id', validateJWT.authenticateToken, fetchAllForArtist);

/**
 * Download music
 */
router.get('/download', minioService.download);

/**
 * Search a music by id.
 */
router.get('/:id', validateJWT.authenticateToken, findById);

/**
 * Fetch all subscribed musics for a user
 */
router.get('/user/:id', validateJWT.authenticateToken, findById);




module.exports = router;
