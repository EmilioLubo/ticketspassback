let router = require('express').Router()
const passport = require("../config/passport");
let {create,read,update,destroy,show} = require('../controllers/venue')
let validator = require('../middlewares/validator')
let schema = require('../schemas/venue')

router.get('/',read)
router.get('/:id', show)
router.post('/',passport.authenticate("jwt", { session: false }), validator(schema),create)
router.delete('/:id',passport.authenticate("jwt", { session: false }), destroy)
router.patch('/:id',passport.authenticate("jwt", { session: false }), update)

module.exports = router