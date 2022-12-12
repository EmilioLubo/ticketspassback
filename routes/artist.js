const router = require('express').Router()
const {create, read, update, destroy} = require('../controllers/artist')
const schema = require('../schemas/artist')
const validator = require('../middlewares/validator')
const passport = require('../config/passport')
const nameAlreadyExist = require('../middlewares/nameAlreadyExist')
const model = require('../models/Artist')

router.post('/', passport.authenticate("jwt", { session: false }), nameAlreadyExist(model), create)
router.get('/', read)
router.get('/:id', read)

module.exports = router