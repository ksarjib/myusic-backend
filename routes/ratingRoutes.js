const express = require('express');

const ratingController = require('../controllers/rating');

const router = express.Router();

const { add,fetchAll,findById,updateMusicById,deleteMusicById,removeAll} = ratingController;

/**
 * Add a Rating
 * 
 */
router.post('/add',  validateJWT.authenticateToken, add);

// /**
//  * User Login.
//  */
// router.post('/login', login);

/**
 * Get all Rating.
 */
router.get('/', validateJWT.authenticateToken, fetchAll);

// /**
//  * Search a Rating by id.
//  */
// router.get('/:id', findById);

// /**
//  * Update a Rating by id.
//  */
// router.put('/:id', updateMusicById);

// /**
//  * Delete a Rating by id.
//  */
// router.delete('/:id', deleteMusicById);
// /**
//  * Delete all Rating.
//  */

// router.delete('/',removeAll);

module.exports = router;
