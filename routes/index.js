let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');
let concerts = require('./concerts');
let venueRouter = require('./venue')
let artist = require('./artist')

// Import all routes
router.use('/auth', user)
router.use('/venues',venueRouter)
router.use('/tickets', ticket)
router.use('/concerts', concerts);
router.use('/artists', artist)

module.exports = router;
