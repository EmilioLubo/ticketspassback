let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');

// Import all routes

router.use('/users', user)
router.use('/tickets', ticket)

module.exports = router;
