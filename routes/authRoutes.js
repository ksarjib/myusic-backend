const express = require('express');

const userController = require('../controllers/auth');

const router = express.Router();

const { add, fetchAll, findById, deleteUserById, updateUserById, login } = userController;
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
router.get('/', fetchAll);

/**
 * Search a user by id.
 */
router.get('/:id', findById);

/**
 * Update a user by id.
 */
router.put('/:id', updateUserById);

/**
 * Delete a user by id.
 */
router.delete('/:id', deleteUserById);

module.exports = router;
