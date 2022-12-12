let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');
let artist = require('./artist')
let venueRouter = require('./venue')

router.use('/auth', user)
router.use('/venue',venueRouter)
router.use('/tickets', ticket)
router.use('/artist', artist)

module.exports = router;
