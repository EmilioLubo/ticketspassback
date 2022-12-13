const router = require('express').Router();
const passport = require('../config/passport');

let { create, readOne, read, update } = require('../controllers/ticket');

router.route('/')
    .post(passport.authenticate("jwt", { session: false }), create)
    .get(passport.authenticate("jwt", { session: false }), read)

router.route('/:id')
    .get(readOne)
    .patch(passport.authenticate("jwt", { session: false }), update)


module.exports = router
