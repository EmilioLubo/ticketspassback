let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');

let venueRouter = require('./venue')

router.use('/venue',venueRouter)

router.use('/users', user)
router.use('/tickets', ticket)

module.exports = router;
