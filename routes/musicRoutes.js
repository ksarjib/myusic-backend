const express = require('express');
const musicController = require('../controllers/music');
const router = express.Router();
const { add,fetchAll,findById} = musicController;
const uploadFile = require('../middlewares/imageUpload');
const validateJWT = require('../utils/jwtUtils')

/**
 * Add a music
 * 
 */

 router.post('/', validateJWT.authenticateToken, uploadFile, add);

// // /**
// //  * User Login.
// //  */
// // router.post('/login', login);

/**
 * Get all musics.
 */
router.get('/', validateJWT.authenticateToken, fetchAll);

/**
 * Search a music by id.
 */
router.get('/:id', validateJWT.authenticateToken, findById);





// /**
//  * Update a music by id.
//  */
// router.put('/:id', updateMusicById);

// /**
//  * Delete a music by id.
//  */
// router.delete('/:id', deleteMusicById);
// /**
//  * Delete all musics.
//  */

// router.delete('/',removeAll);

module.exports = router;
