const express = require('express');
const subscriptionController = require('../controllers/subscription');
const router = express.Router();
const validateJWT = require('../utils/jwtUtils');
const { subscribe, unsubscribe } = subscriptionController;

router.post('/', subscribe);
router.delete('/', unsubscribe);


module.exports = router;
