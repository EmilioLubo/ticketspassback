let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');
let concerts = require('./concerts');

// Import all routes
router.use('/auth', user)
router.use('/tickets', ticket)
router.use('/concerts', concerts);

module.exports = router;
