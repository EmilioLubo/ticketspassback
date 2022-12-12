let router = require('express').Router();

let venueRouter = require('./venue')

router.use('/venue',venueRouter)

module.exports = router;
