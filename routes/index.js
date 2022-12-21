let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');
let concert = require('./concert');
let venueRouter = require('./venue')
let artist = require('./artist')
let cart = require('./cart');
let order = require('./order');
let message = require('./message')

// Import all routes
router.use('/auth', user)
router.use('/venues',venueRouter)
router.use('/tickets', ticket)
router.use('/concerts', concert);
router.use('/artists', artist)
router.use('/carts', cart)
router.use('/orders', order);
router.use('/message', message)

module.exports = router;
