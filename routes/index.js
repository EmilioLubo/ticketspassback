let router = require('express').Router();
let ticket = require('./ticket');
let user = require('./user');
let artist = require('./artist')

router.use('/auth', user)
router.use('/tickets', ticket)
router.use('/artist', artist)

module.exports = router;
