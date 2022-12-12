let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');
let concerts = require('./concerts');
let venueRouter = require('./venue')

// Import all routes
router.use('/auth', user)
router.use('/venue',venueRouter)
router.use('/tickets', ticket)
router.use('/concerts', concerts);

module.exports = router;
