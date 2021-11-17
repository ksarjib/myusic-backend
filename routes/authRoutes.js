const express = require('express');
const validateJWT = require('../utils/jwtUtils');

const userController = require('../controllers/auth');

const router = express.Router();

const { add, fetchAll, fetchAllArtists, findById, deleteUserById, updateUserById, login } = userController;
/**
 * Add a user
 * 
 */
router.post('/register', add);

/**
 * User Login.
 */
router.post('/login', login);

/**
 * Get all users.
 */
router.get('/', validateJWT.authenticateToken, fetchAll);


/**
 * Get all artists.
 */
router.get('/artists', validateJWT.authenticateToken, fetchAllArtists);

/**
 * Search a user by id.
 */
router.get('/:id', validateJWT.authenticateToken, findById);

/**
 * Update a user by id.
 */
router.put('/:id', validateJWT.authenticateToken, updateUserById);

/**
 * Delete a user by id.
 */
router.delete('/:id', validateJWT.authenticateToken, deleteUserById);

module.exports = router;
