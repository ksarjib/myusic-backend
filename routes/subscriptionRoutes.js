const express = require('express');
const subscriptionController = require('../controllers/subscription');
const router = express.Router();
const validateJWT = require('../utils/jwtUtils');
const { subscribe,unsubscribe} = subscriptionController;

router.get('/', subscribe);
router.delete('/:id/:artist_id',  unsubscribe);


module.exports = router;
