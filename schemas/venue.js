let joi = require('joi')

let schema = joi.object({
    name:joi.string().required(),
    address:joi.string().required(),
    capacity:joi.number().required(),
    email:joi.string().email({minDomainSegments: 2}).required(),
    type:joi.string().required(),
    location:joi.string(),
    country:joi.string().required(),
    city:joi.string().required()
})

module.exports = schema