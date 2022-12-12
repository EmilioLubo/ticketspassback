let router = require('express').Router()
let {create,read,update,destroy} = require('../controllers/venue')
let validator = require('../middlewares/validator')
let schema = require('../schemas/venue')

router.get('/',read)
router.post('/',validator(schema),create)
router.delete('/:id',destroy)
router.patch('/:id',update)

module.exports = router